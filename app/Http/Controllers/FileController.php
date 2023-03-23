<?php

namespace App\Http\Controllers;

use App\Models\File;
use Inertia\Inertia;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $ancestors = Folder::with(['ancestors' => function ($q) {
            $q->with('ancestors');
        }])->find($id);

        $list = [];
        $this->getAncestors($ancestors, $list);

        $files = File::with('user')
                        ->where('folder_id', $id)
                        ->paginate(24)
                        ->withQueryString();
        // dd($files);
        $folders = Folder::where('parent_folder_id', $id)->with('user')->get();

        if ($request->wantsJson()) {
            return $files;
        }
        return Inertia::render('Files/Index', [
            'folder_id' => (int)$id,
            'files' => $files,
            'folders' => $folders,
            'ancestors' => array_reverse($list)
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

        $folder = Folder::find($request->folder_id);

        foreach ($request->file as $file) {
            $name = $file->getClientOriginalName();
            if ($folder) {
                $path = $file->storeAs($folder->name, $name, 'public');
            } else {
                $path = $file->storeAs('/', $name, 'public');
            }

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
    public function destroy(File $file)
    {
        //
    }

    /**
     * Renames file
     */
    public function rename(Request $request, $id)
    {
        dd($request);
    }
}
