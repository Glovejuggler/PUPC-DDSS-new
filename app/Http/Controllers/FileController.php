<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
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

        $ancestors = Folder::with(['ancestors' => function ($q) {
            $q->with('ancestors');
        }])->find($id);

        $list = [];
        $this->getAncestors($ancestors, $list);

        if (Auth::user()->id !== 1) {
            $files = File::with(['user', 'shares'])
                        ->whereHas('user', function($q) {
                            $q->where('role_id',Auth::user()->id);
                        })
                        ->where('folder_id', $id)
                        ->paginate(24)
                        ->withQueryString();
            $folders = Folder::where('parent_folder_id', $id)
                        ->with(['user', 'shares'])
                        ->whereHas('user', function($q) {
                            $q->where('role_id',Auth::user()->id);
                        })
                        ->get();
        } else {
            $files = File::with(['user', 'shares'])
                        ->where('folder_id', $id)
                        ->paginate(24)
                        ->withQueryString();
            $folders = Folder::where('parent_folder_id', $id)
                        ->with(['user', 'shares'])
                        ->get();
        }

        if ($request->wantsJson()) {
            return $files;
        }

        return Inertia::render('Files/Index', [
            'folder_id' => (int)$id,
            'files' => $files,
            'folders' => $folders,
            'ancestors' => array_reverse($list),
            'roles' => Role::where('id','!=',1)->where('id', '!=', Auth::user()->role_id)->get(),
            'users' => User::where('id', '!=', Auth::user()->id)->where('role_id','!=',Auth::user()->role_id)->get(),
        ]);
    }

    /**
     * Displays listing of softdeleted records
     */
    public function trash(Request $request)
    {
        if (Auth::user()->role_id !== 1) {
            $files = File::onlyTrashed()
                            ->with('user')
                            ->whereHas('user', function($q) {
                                $q->where('role_id',Auth::user()->id);
                            })
                            ->paginate(24)
                            ->withQueryString();
            $folders = Folder::onlyTrashed()
                            ->with('user')
                            ->whereHas('user', function($q) {
                                $q->where('role_id',Auth::user()->id);
                            })
                            ->get();
        } else {
            $files = File::onlyTrashed()
                            ->with('user')
                            ->paginate(24)
                            ->withQueryString();
            $folders = Folder::onlyTrashed()->with('user')->get();
        }

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
            'file.*' => 'mimes:csv,txt,xlsx,xls,pdf,jpg,jpeg,png,docx,pptx,zip,rar'
        ]);

        // $folder = Folder::find($request->folder_id);

        foreach ($request->file as $file) {
            $name = $file->getClientOriginalName();
            $hashedName = $file->hashName();
            // if ($folder) {
            //     $path = $file->storeAs($folder->name, $name, 'public');
            // } else {
            //     $path = $file->storeAs('/', $name, 'public');
            // }
            $path = $file->storeAs('/', $hashedName, 'public');

            $newFile = File::create([
                'name' => $name,
                'path' => $path,
                'mime' => $file->getMimeType(),
                'size' => $file->getSize(),
                'folder_id' => $request->folder_id,
                'user_id' => Auth::user()->id,
            ]);
        }

        return redirect()->back();
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
        $file->delete();

        return redirect()->back();
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
        Storage::disk('public')->delete($file->path);
        $file->forceDelete();

        return redirect()->back();
    }

    /**
     * Empty trash
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
        $file = File::onlyTrashed()->find($id);
        $file->restore();

        return redirect()->back();
    }

    /**
     * Renames file
     */
    public function rename(Request $request, $id)
    {
        // dd($request, File::find($id));
        $file = File::find($id);
        $file->update([
            'name' => $request->name
        ]);

        return redirect()->back();
    }

    /**
     * Downloads file
     */
    public function download($id)
    {
        $file = File::find($id);
        // dd(Storage::exists(Storage::url($file->path)), $file->path, Storage::url($file->path));
        return Storage::disk('public')->download($file->path, $file->name);
    }
}