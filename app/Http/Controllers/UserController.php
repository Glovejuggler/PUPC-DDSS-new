<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\File;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::with('role')->get(),
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
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'birthday' => 'date|required',
            'address' => 'required',
            'contact' => 'required',
            'role_id' => 'required',
            'email' => 'email|required|unique:users',
            'password' => 'required'
        ]);
        // dd($request);

        User::create([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'birthday' => Carbon::parse($request->birthday),
            'address' => $request->address,
            'contact' => $request->contact,
            'role_id' => $request->role_id,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id = NULL)
    {
        if (Auth::user()->role_id != 1 && Auth::user()->id != $id && $id) {
            abort(403);
        }
        
        $user = $id ? User::find($id) : Auth::user();

        $files = File::with('user')->where('user_id', $user->id)->paginate(24)->withQueryString();

        if ($request->wantsJson()) {
            return $files;
        }

        return inertia('Users/Show', [
            'user' => $user,
            'files' => $files,
            'roles' => Role::all()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // dd($request);
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'birthday' => 'date|required',
            'address' => 'required',
            'contact' => 'required',
            'role_id' => 'required',
            'email' => 'email|required',
        ]);

        $user = User::find($id);
        $user->update([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'birthday' => Carbon::parse($request->birthday),
            'address' => $request->address,
            'contact' => $request->contact,
            'email' => $request->email,
        ]);

        if ($user->id != 1) {
            $user->update([
                'role_id' => $request->role_id
            ]);
        }

        if ($request->password) {
            User::find($id)->update([
                'password' => Hash::make($request->password)
            ]);
        }

        return redirect()->back();
    }

    /**
     * Changes avatar of user
     */
    public function avatar(Request $request, $id)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:png,jpg|max:2048'
        ]);

        if (Auth::user()->role_id != 1 && Auth::user()->id != $id && $id) {
            abort(403);
        }

        // dd($request->avatar, $id);
        $user = User::findOrFail($id);

        if (Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        $name = $request->avatar->hashName();

        $path = $request->avatar->storeAs('avatars', $name, 'public');

        $user->update([
            'avatar' => $path
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (Auth::user()->role_id === 1) {
            User::find($id)->delete();
        } else {
            abort(403);
        }

        return redirect()->back();
    }
}
