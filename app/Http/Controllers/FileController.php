<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Share;
use App\Models\Folder;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    /**
     * Gets the ancestor of the folder up to the roots
     */
    public function getAncestors($ancestor, &$storage)
    {
        $storage[] = $ancestor?->name;
        if ($ancestor?->ancestors) {
            $this->getAncestors($ancestor->ancestors, $storage);
        } else {
            $storage[] = 'Files';
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $id = NULL)
    {  
        if ($id) {
            if (!Folder::where('id',$id)->exists()) {
                abort(404);
            }
        }

        if (Auth::user()->role_id == 3) return redirect()->route('registrar.dashboard');

        $ancestors = Folder::with(['ancestor' => function ($q) {
            $q->with('ancestor');
        }])->find($id);

        $list = [];
        $this->getAncestors($ancestors, $list);

        $files = File::with(['user', 'shares'])
                        ->filter($request->only(['search', 'sortBy']))
                        ->folder($request->only(['search']), $id)
                        ->admin()
                        ->orderBy('name', 'asc')
                        ->paginate(24)
                        ->withQueryString();
        $folders = Folder::with(['user', 'shares'])
                        ->filter($request->only(['search', 'sortBy']))
                        ->folder($request->only(['search']), $id)
                        ->admin()
                        ->orderBy('name', 'asc')
                        ->get();

        if ($request->wantsJson()) {
            return $files;
        }

        return Inertia::render('Files/Index', [
            'folder_id' => $id == 0 ? null : (int)$id,
            'files' => $files,
            'folders' => $folders,
            'ancestors' => array_reverse($list),
            'roles' => Role::where('id','!=',1)->where('id', '!=', Auth::user()->role_id)->get(),
            'users' => User::where('id', '!=', Auth::user()->id)->where('role_id','!=',Auth::user()->role_id)->get(),
            'filters' => $request->only(['search', 'sortBy'])
        ]);
    }

    /**
     * Displays listing of softdeleted records
     */
    public function trash(Request $request)
    {
        // if (Auth::user()->role_id !== 1) {
        //     $files = File::onlyTrashed()
        //                     ->with('user')
        //                     ->whereHas('user', function($q) {
        //                         $q->where('role_id',Auth::user()->role_id);
        //                     })
        //                     ->paginate(24)
        //                     ->withQueryString();
        //     $folders = Folder::onlyTrashed()
        //                     ->with('user')
        //                     ->whereHas('user', function($q) {
        //                         $q->where('role_id',Auth::user()->role_id);
        //                     })
        //                     ->get();
        // } else {
        //     $files = File::onlyTrashed()
        //                     ->with('user')
        //                     ->paginate(24)
        //                     ->withQueryString();
        //     $folders = Folder::onlyTrashed()->with('user')->get();
        // }
        if (Auth::user()->role_id == 3) return redirect()->route('registrar.dashboard');

        $files = File::onlyTrashed()
                        ->with(['user', 'shares'])
                        ->filter($request->only(['search', 'sortBy']))
                        ->admin()
                        ->orderBy('name', 'asc')
                        ->paginate(24)
                        ->withQueryString();
        $folders = Folder::onlyTrashed()
                        ->with(['user', 'shares'])
                        ->filter($request->only(['search', 'sortBy']))
                        ->admin()
                        ->orderBy('name', 'asc')
                        ->get();

        if ($request->wantsJson()) {
            return $files;
        }

        return Inertia::render('Files/Trash', [
            'files' => $files,
            'folders' => $folders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->folder_id);
        $request->validate([
            'file' => 'required',
            'file.*' => 'mimes:csv,txt,xlsx,xls,pdf,jpg,jpeg,png,docx,doc,ppt,pptx,zip,rar|max:209715200'
        ]);

        if (Auth::user()->role_id == 3) return redirect()->route('registrar.dashboard');

        // $folder = Folder::find($request->folder_id);

        foreach ($request->file as $file) {
            $name = $file->getClientOriginalName();
            $hashedName = $file->hashName();
            // if ($folder) {
            //     $path = $file->storeAs($folder->name, $name, 'public');
            // } else {
            //     $path = $file->storeAs('/', $name, 'public');
            // }
            $path = $file->storeAs('/', $hashedName);

            $newFile = File::create([
                'name' => $name,
                'path' => $path,
                'mime' => $file->getMimeType(),
                'size' => $file->getSize(),
                'folder_id' => $request->folder_id,
                'user_id' => Auth::id(),
            ]);

            activity()
                ->causedBy(Auth::user())
                ->performedOn($newFile)
                ->withProperties(['name' => $newFile->name])
                ->event('uploaded')
                ->log($newFile->user->role_id);
        }

        return redirect()->back()->withFlash(['success', 'File/s uploaded successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\File  $file
     * @return \Illuminate\Http\Response
     */
    public function show(File $file)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\File  $file
     * @return \Illuminate\Http\Response
     */
    public function edit(File $file)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\File  $file
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, File $file)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\File  $file
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $file = File::find($id);

        if (Auth::user()->role_id == 3) return redirect()->route('registrar.dashboard');

        if ($file->user->id != Auth::id() && Auth::user()->role_id != 1 && $file->user->role_id != Auth::user()->role_id) {
            abort(403);
        }

        activity()
                ->causedBy(Auth::user())
                ->performedOn($file)
                ->withProperties(['name' => $file->name])
                ->event('deleted')
                ->log($file->user->role_id);

        $file->delete();

        return redirect()->back()->withFlash(['success', 'File deleted']);
    }

    /**
     * Permanently deletes soft deleted file
     * 
     * :FlareWheeze: at function name
     * 
     * > "I AM ATOMIC"
     * > *File do be reduced to atoms lmao*
     */
    public function atomize($id)
    {
        $file = File::onlyTrashed()->find($id);

        if (Auth::user()->role_id == 3) return redirect()->route('registrar.dashboard');

        if ($file->user->id != Auth::id() && Auth::user()->role_id != 1 && $file->user->role_id != Auth::user()->role_id) {
            abort(403);
        }

        activity()
            ->causedBy(Auth::user())
            ->performedOn($file)
            ->withProperties(['name' => $file->name])
            ->event('permanently deleted')
            ->log($file->user->role_id);
        
        Storage::delete($file->path);
        $file->forceDelete();

        return redirect()->back()->withFlash(['success', 'Permanently deleted file']);
    }

    /**
     * Empty trash
     * not yet implemented
     */
    public function ultimateAtomize()
    {
        $files = File::onlyTrashed()->forceDelete();
        $folders = Folder::onlyTrashed()->forceDelete();

        return redirect()->back();
    }

    /**
     * Restores soft deleted file
     */
    public function restore($id)
    {
        $file = File::onlyTrashed()->with('user')->find($id);

        if (Auth::user()->role_id == 3) return redirect()->route('registrar.dashboard');

        if ($file->user->id != Auth::id() && Auth::user()->role_id != 1 && $file->user->role_id != Auth::user()->role_id) {
            abort(403);
        }

        activity()
            ->causedBy(Auth::user())
            ->performedOn($file)
            ->withProperties(['name' => $file->name])
            ->event('restored')
            ->log($file->user->role_id);
        
        $file->restore();

        return redirect()->back()->withFlash(['success', 'File restored', $file->folder]);
    }

    /**
     * Renames file
     */
    public function rename(Request $request, $id)
    {
        // dd($request, File::find($id));
        $request->validate([
            'name' => 'required'
        ]);
        
        $file = File::find($id);

        if (Auth::user()->role_id == 3) return redirect()->route('registrar.dashboard');

        if ($file->user->id != Auth::id() && Auth::user()->role_id != 1 && $file->user->role_id != Auth::user()->role_id) {
            abort(403);
        }

        if (File::where('id','!=',$id)->where('folder_id',$file->folder_id)->where('name',$request->name)->exists()) {
            return redirect()->back()->withErrors([
                'file_rename' => 'A file with this name already exists'
            ]);
        }

        activity()
            ->causedBy(Auth::user())
            ->performedOn($file)
            ->withProperties(['from' => [
                'name' => $file->name
            ], 'to' => [
                'name' => $request->name
            ]])
            ->event('renamed')
            ->log($file->user->role_id);

        $file->update([
            'name' => $request->name
        ]);

        return redirect()->back()->withFlash(['success', 'Rename success']);
    }

    /**
     * Moves file to another folder
     */
    public function move(Request $request, $id)
    {
        $file = File::find($id);

        if (Auth::user()->role_id == 3) return redirect()->route('registrar.dashboard');

        if ($file->user->id != Auth::id() && Auth::user()->role_id != 1 && $file->user->role_id != Auth::user()->role_id) {
            abort(403);
        }

        // dd($file, $request->to);

        activity()
            ->causedBy(Auth::user())
            ->performedOn($file)
            ->withProperties(['from' => [
                'folder' => $file->folder?->name,
            ], 'to' => [
                'folder' => Folder::find($request->to)?->name
            ], 'name' => $file->name])
            ->event('moved')
            ->log($file->user->role_id);

        $file->update([
            'folder_id' => $request->to,
        ]);

        return redirect()->back()->withFlash(['success', 'File moved successfully']);
    }

    /**
     * Downloads file
     */
    public function download($id)
    {
        if (Auth::user()->role_id == 3) return redirect()->route('registrar.dashboard');

        $file = File::with(['shares' => function ($q) {
            $q->where(function($q) {
                $q->where('subject_type', 'App\Models\User')
                    ->where('subject_id', Auth::id());
            })->orWhere(function ($q) {
                $q->where('subject_type', 'App\Models\Role')
                    ->where('subject_id', Auth::user()->role_id);
            });
        }])->find($id);

        $isShared = false;

        $folder = $file->folder;

        if ($folder) {
            $shares = $folder->shares()->where(function ($q) {
                $q->where('subject_type', 'App\Models\User')
                    ->where('subject_id', Auth::id());
            })->orWhere(function ($q) {
                $q->where('subject_type', 'App\Models\Role')
                    ->where('subject_id', Auth::user()->role_id);
            })->get();

            $isShared = $shares->isNotEmpty();
        }

        while ($folder && !$isShared) {
            $folder = $folder->ancestor;
            if ($folder) {
                $shares = $folder->shares()->where(function ($q) {
                    $q->where('subject_type', 'App\Models\User')
                        ->where('subject_id', Auth::id());
                })->orWhere(function ($q) {
                    $q->where('subject_type', 'App\Models\Role')
                        ->where('subject_id', Auth::user()->role_id);
                })->get();

                $isShared = $shares->isNotEmpty();
            }
        }

        if ($file->user->id != Auth::id() && Auth::user()->role_id != 1 && $file->user->role_id != Auth::user()->role_id && $file->shares->isEmpty() && !$isShared) {
            abort(403);
        }
        // dd(Storage::exists(Storage::url($file->path)), $file->path, Storage::url($file->path));
        return Storage::download($file->path, $file->name);
    }
}
