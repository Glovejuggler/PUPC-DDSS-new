<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FolderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $id = null)
    {
        if ($request->wantsJson()) {
            return [
                'folders' => Folder::admin()->folder(false, $id)->get(),
                'parent' => Folder::find($id)?->parent_folder_id
            ];
        } else {
            abort(404);
        }
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
        // dd($request);
        $request->validate([
            'name' => 'required',
        ]);

        if (Folder::where('name',$request->name)->where('parent_folder_id',$request->folder_id)->exists()) {
            return redirect()->back()->withErrors([
                'folder_name' => 'Folder already exists'
            ]);
        }

        $newFolder = Folder::create([
            'name' => $request->name,
            'parent_folder_id' => $request->folder_id,
            'user_id' => Auth::user()->id
        ]);

        activity()
            ->causedBy(Auth::user())
            ->performedOn($newFolder)
            ->withProperties(['name' => $newFolder->name])
            ->event('created')
            ->log($newFolder->user->role_id);

        return redirect()->back()->withFlash(['success', 'Folder created successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function show(Folder $folder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function edit(Folder $folder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        
    }

    /**
     * Renames folder
     */
    public function rename(Request $request, $id)
    {
        $request->validate([
            'name' => 'required'
        ]);
        
        $folder = Folder::find($id);

        if (Auth::id() != $folder->user_id && Auth::user()->role_id != 1 && Auth::user()->role_id != $folder->user->role_id) {
            abort(403);
        }

        if (Folder::where('id','!=',$id)->where('name',$request->name)->where('parent_folder_id',$folder->parent_folder_id)->exists()) {
            return redirect()->back()->withErrors([
                'folder_rename' => 'Folder already exists'
            ]);
        }

        activity()
            ->causedBy(Auth::user())
            ->performedOn($folder)
            ->withProperties(['from' => [
                'name' => $folder->name
            ], 'to' => [
                'name' => $request->name
            ]])
            ->event('renamed')
            ->log($folder->user->role_id);

        $folder->update([
            'name' => $request->name
        ]);

        return redirect()->back()->withFlash(['success', 'Rename success']);
    }

    /**
     * Moves folder
     */
    public function move(Request $request, $id)
    {
        $folder = Folder::find($id);

        if (Auth::id() != $folder->user_id && Auth::user()->role_id != 1 && Auth::user()->role_id != $folder->user->role_id) {
            abort(403);
        }

        activity()
            ->causedBy(Auth::user())
            ->performedOn($folder)
            ->withProperties(['from' => [
                'folder' => $folder->ancestor?->name,
            ], 'to' => [
                'folder' => Folder::find($request->to)?->name
            ], 'name' => $folder->name])
            ->event('moved')
            ->log($folder->user->role_id);

        $folder->update([
            'parent_folder_id' => $request->to,
        ]);

        return redirect()->back()->withFlash(['success', 'Folder moved successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $folder = Folder::find($id);

        if (Auth::id() != $folder->user_id && Auth::user()->role_id != 1 && Auth::user()->role_id != $folder->user->role_id) {
            abort(403);
        }

        activity()
            ->causedBy(Auth::user())
            ->performedOn($folder)
            ->withProperties(['name' => $folder->name])
            ->event('deleted')
            ->log($folder->user->role_id);

        $folder->delete();

        return redirect()->back()->withFlash(['success', 'Folder deleted']);
    }

    /**
     * Permanently deletes soft deleted folder
     */
    public function atomize($id)
    {
        $folder = Folder::onlyTrashed()->find($id);

        if (Auth::id() != $folder->user_id && Auth::user()->role_id != 1 && Auth::user()->role_id != $folder->user->role_id) {
            abort(403);
        }

        activity()
            ->causedBy(Auth::user())
            ->performedOn($folder)
            ->withProperties(['name' => $folder->name])
            ->event('permanently deleted')
            ->log($folder->user->role_id);

        $folder->forceDelete();

        $files = File::where('folder_id', $id)->get();

        foreach ($files as $file) {
            Storage::delete($file->path);
            $file->forceDelete();
        }

        return redirect()->back()->withFlash(['success', 'Permanently deleted folder']);
    }

    /**
     * Restores soft deleted folder
     */
    public function restore($id)
    {
        $folder = Folder::onlyTrashed()->find($id);

        if (Auth::id() != $folder->user_id && Auth::user()->role_id != 1 && Auth::user()->role_id != $folder->user->role_id) {
            abort(403);
        }

        activity()
            ->causedBy(Auth::user())
            ->performedOn($folder)
            ->withProperties(['name' => $folder->name])
            ->event('restored')
            ->log($folder->user->role_id);
        
        $folder->restore();

        return redirect()->back()->withFlash(['success', 'Folder restored']);
    }
}
