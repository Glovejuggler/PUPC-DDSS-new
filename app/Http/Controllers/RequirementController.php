<?php

namespace App\Http\Controllers;

use App\Models\Requirement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RequirementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Auth::user()->role_id != 2 && Auth::user()->role_id != 3) {
            abort(403);
        }

        return inertia('Requirements/Index', [
            'requirements' => Requirement::with('sub')->main()->get(),
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
        if (Auth::user()->role_id != 2 && Auth::user()->role_id != 3) {
            abort(403);
        }

        $request->validate([
            'parent_requirement_id' => 'nullable',
            'category' => 'required',
            'name' => 'required'
        ]);

        Requirement::create([
            'parent_requirement_id' => $request->parent_requirement_id,
            'category' => $request->category,
            'name' => $request->name,
        ]);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Requirement  $requirement
     * @return \Illuminate\Http\Response
     */
    public function show(Requirement $requirement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Requirement  $requirement
     * @return \Illuminate\Http\Response
     */
    public function edit(Requirement $requirement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Requirement  $requirement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if (Auth::user()->role_id != 2 && Auth::user()->role_id != 3) {
            abort(403);
        }

        $request->validate([
            'name' => 'required',
            'category' => 'required'
        ]);

        $requirement = Requirement::find($id);
        $requirement->update([
            'name' => $request->name,
            'category' => $request->category,
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Requirement  $requirement
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (Auth::user()->role_id != 2 && Auth::user()->role_id != 3) {
            abort(403);
        }

        $requirement = Requirement::find($id)->delete();

        return redirect()->back();
    }
}
