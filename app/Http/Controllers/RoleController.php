<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Auth::user()->role_id != 1) {
            abort(403);
        }

        return inertia('Roles/Index', [
            'roles' => Role::all()
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
        if (Auth::user()->role_id != 1) {
            abort(403);
        }

        $request->validate([
            'name' => 'unique:roles,name'
        ]);

        $new = Role::create([
            'name' => $request->name,
        ]);

        return redirect()->back()->withFlash(['success', 'Role created']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (Auth::user()->role_id != 1) {
            abort(403);
        }

        $users = User::where('role_id', $id)->get();

        return inertia('Roles/Show', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if (Auth::user()->role_id != 1) {
            abort(403);
        }

        $role = Role::find($id);

        $role->update([
            'name' => $request->name,
        ]);

        return redirect()->back()->withFlash(['success', 'Role updated']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if ($id == 1 || $id == 2 || Auth::user()->role_id != 1) {
            abort(403);
        }

        $role = Role::find($id);

        $role->delete();

        return redirect()->back()->withFlash(['success', 'Role deleted']);
    }
}
