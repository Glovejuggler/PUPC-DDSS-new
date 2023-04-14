<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FolderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
                'name' => 'Folder already exists'
            ]);
        }

        $newFolder = Folder::create([
            'name' => $request->name,
            'parent_folder_id' => $request->folder_id,
            'user_id' => Auth::user()->id
        ]);

        return redirect()->back();
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
        $folder = Folder::find($id);
        $folder->update([
            'name' => $request->name
        ]);

        return redirect()->back();
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
        $folder->delete();

        return redirect()->back();
    }

    /**
     * Permanently deletes soft deleted folder
     */
    public function atomize($id)
    {
        $folder = Folder::onlyTrashed()->find($id);
        $folder->forceDelete();

        return redirect()->back();
    }

    /**
     * Restores soft deleted folder
     */
    public function restore($id)
    {
        $folder = Folder::onlyTrashed()->find($id);
        $folder->restore();

        return redirect()->back();
    }
}
