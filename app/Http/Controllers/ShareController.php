<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\User;
use App\Models\Share;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShareController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $id = null)
    {
        // dd(File::where('folder_id', $id)->whereHas('shares', function ($q) {
        //     $q->where('subject_type', 'App\Models\User')
        //         ->where('subject_id', Auth::user()->id);
        // })->get());

        if (Auth::user()->role_id != 1) {
            if (!$id) {
                $files = File::with(['user', 'shares'])
                            ->whereHas('shares', function ($q) {
                                $q->where('subject_type', 'App\Models\User')
                                    ->where('subject_id', Auth::user()->id)
                                    ->orWhere(function($q) {
                                        $q->where('subject_type', 'App\Models\Role')
                                            ->where('subject_id', Auth::user()->role_id);
                                    });
                                })
                            ->paginate(24)
                            ->withQueryString();
                $folders = Folder::with(['user', 'shares'])
                                ->whereHas('shares', function ($q) {
                                    $q->where('subject_type', 'App\Models\User')
                                        ->where('subject_id', Auth::user()->id)
                                        ->orWhere(function($q) {
                                            $q->where('subject_type', 'App\Models\Role')
                                                ->where('subject_id', Auth::user()->role_id);
                                        });
                                })->get();
            } else {
                $files = File::with(['user', 'shares'])
                        ->where('folder_id', $id)
                        ->paginate(24)
                        ->withQueryString();
                $folders = Folder::where('parent_folder_id', $id)
                        ->with(['user', 'shares'])->get();
            }
        } else {
            abort(404);
        }

        if ($request->wantsJson()) {
            return $files;
        }

        return inertia('Share/Index', [
            'files' => $files,
            'folders' => $folders,
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
    public function store(Request $request, $id)
    {
        // dd($request, $id);
        if ($request->role) {
            foreach ($request->role as $role) {
                Share::firstOrCreate([
                    'shareable_type' => $request->type,
                    'shareable_id' => $id, 
                    'subject_type' => 'App\Models\Role',
                    'subject_id' => $role,
                ], [
                    'shared_by' => Auth::user()->id
                ]);
            }
            Share::where('shareable_type', $request->type)
                    ->where('shareable_id','=',$id)
                    ->where('subject_type', 'App\Models\Role')
                    ->whereNotIn('subject_id', $request->role)
                    ->delete();
        } else {
            Share::where('shareable_type', $request->type)
                    ->where('subject_type', 'App\Models\Role')
                    ->where('shareable_id', $id)
                    ->delete();
        }

        if ($request->user) {
            foreach ($request->user as $user) {
                Share::firstOrCreate([
                    'shareable_type' => $request->type,
                    'shareable_id' => $id, 
                    'subject_type' => 'App\Models\User',
                    'subject_id' => $user,
                ], [
                    'shared_by' => Auth::user()->id
                ]);
            }
            Share::where('shareable_type', $request->type)
                    ->where('shareable_id','=',$id)
                    ->where('subject_type', 'App\Models\User')
                    ->whereNotIn('subject_id', $request->user)
                    ->delete();
        } else {
            Share::where('shareable_type', $request->type)
                    ->where('subject_type', 'App\Models\User')
                    ->where('shareable_id', $id)
                    ->delete();
        }

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Share  $share
     * @return \Illuminate\Http\Response
     */
    public function show(Share $share)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Share  $share
     * @return \Illuminate\Http\Response
     */
    public function edit(Share $share)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Share  $share
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Share $share)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Share  $share
     * @return \Illuminate\Http\Response
     */
    public function destroy(Share $share)
    {
        //
    }
}
