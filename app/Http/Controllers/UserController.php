<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\File;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Folder;
use Illuminate\Http\Request;
use App\Http\Requests\AvatarRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
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
    public function store(StoreUserRequest $request)
    {
        User::create($request->validated());

        return redirect()->back()->withFlash(['success', 'User created']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id = NULL)
    {
        if (Auth::user()->role_id != 1 && Auth::id() != $id && $id) {
            abort(403);
        }
        
        $user = $id ? User::find($id) : Auth::user();

        $files = File::with('user')
                ->where('user_id', $user->id)
                ->filter($request->only(['search', 'sortBy']))
                ->orderBy('name', 'asc')
                ->paginate(24)
                ->withQueryString();

        if ($request->wantsJson()) {
            return $files;
        }

        return inertia('Users/Show', [
            'user' => $user,
            'files' => $files,
            'roles' => Role::all(),
            'filters' => $request->only(['search', 'sortBy'])
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
    public function update(UpdateUserRequest $request, $id)
    {
        if (User::where('id', '!=', $id)->where('email', $request->email)->exists()) {
            return redirect()->back()->withErrors([
                'email' => 'This email is already used'
            ]);
        }

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
            $request->validate([
                'password' => 'min:8'
            ]);

            User::find($id)->update([
                'password' => $request->password
            ]);
        }

        return redirect()->back()->withFlash(['success', 'User data updated']);
    }

    /**
     * Changes avatar of user
     */
    public function avatar(AvatarRequest $request, $id)
    {
        $user = User::findOrFail($id);

        if (Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        $name = $request->avatar->hashName();

        $path = $request->avatar->storeAs('avatars', $name, 'public');

        $user->update([
            'avatar' => $path
        ]);

        return redirect()->back()->withFlash(['success', 'Avatar updated']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (Auth::user()->role_id != 1) {
            abort(403);
        }

        $user = User::find($id);

        if ($user->id != 1) {
            $user->delete();
        }

        return redirect()->route('users.index')->withFlash([
            'success', 'User deleted'
        ]);
    }

    /**
     * Change password of self
     */
    public function password(Request $request, $id)
    {
        if (Auth::id() != $id) {
            abort(403);
        }

        $request->validate([
            'password' => 'required|min:8',
            'newPassword' => 'required|min:8',
            'confirmPassword' => 'required|min:8',
        ], [
            'password.required' => 'Enter your current password',
            'newPassword.required' => 'Enter your new password',
            'confirmPassword.required' => 'Type your new password again'
        ]);

        $user = User::find($id);

        if (!Hash::check($request->password, $user->password)) {
            return redirect()->back()->withErrors([
                'password' => 'Incorrect password'
            ]);
        }

        if ($request->newPassword != $request->confirmPassword) {
            return redirect()->back()->withErrors([
                'confirmPassword' => 'Password do not match'
            ]);
        }

        $user->update([
            'password' => $request->confirmPassword
        ]);

        return redirect()->back()->withFlash(['success', 'Password changed']);
    }
}
