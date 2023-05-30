<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\FileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ShareController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\RequirementController;
use App\Http\Controllers\StudentFileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return redirect()->route('login');
});

require __DIR__.'/auth.php';

Route::middleware(['auth'])->group(function () {
    Route::get('/profile/{id?}', [UserController::class, 'show'])->name('profile');

    Route::get('/files/{id?}', [FileController::class, 'index'])->whereNumber('id')->name('files');
    ROute::get('/trash', [FileController::class, 'trash'])->name('trash');
    Route::post('/upload/file', [FileController::class, 'store'])->name('files.upload');
    Route::put('/file/rename/{id}', [FileController::class, 'rename'])->name('files.rename');
    Route::get('/file/download/{id}', [FileController::class, 'download'])->name('files.download');
    Route::delete('/file/{id}/delete/', [FileController::class, 'destroy'])->name('files.destroy');
    Route::get('/file/trash/{id}/restore', [FileController::class, 'restore'])->name('files.restore');
    Route::get('/file/trash/{id}/atomize', [FileController::class, 'atomize'])->name('files.atomize'); // :FlareWheeze:
    Route::put('/file/{id}/move', [FileController::class, 'move'])->name('files.move');

    Route::get('/folders/{id?}', [FolderController::class, 'index'])->name('folders.index');
    Route::post('/folder/store', [FolderController::class, 'store'])->name('folders.store');
    Route::put('/folder/{id}/rename', [FolderController::class, 'rename'])->name('folders.rename');
    Route::delete('/folder/{id}/delete', [FolderController::class, 'destroy'])->name('folders.destroy');
    Route::get('/folder/trash/{id}/restore', [FolderController::class, 'restore'])->name('folders.restore');
    Route::get('/folder/trash/{id}/atomize', [FolderController::class, 'atomize'])->name('folders.atomize');
    Route::put('/folder/{id}/move', [FolderController::class, 'move'])->name('folders.move');

    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    Route::post('/roles/store', [RoleController::class, 'store'])->name('roles.store');
    Route::put('/roles/{id}/update', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('/roles/{id}/delete', [RoleController::class, 'destroy'])->name('roles.destroy');

    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users/store', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
    Route::put('/users/{id}/update', [UserController::class, 'update'])->name('users.update');
    Route::post('/users/{id}/avatar', [UserController::class, 'avatar'])->name('users.avatar');
    Route::delete('/users/{id}/delete', [UserController::class, 'destroy'])->name('users.destroy');
    Route::put('/password/{id}/change', [UserController::class, 'password'])->name('password');

    Route::get('/students', [StudentController::class, 'index'])->name('students.index');
    Route::post('/students/store', [StudentController::class, 'store'])->name('students.store');
    Route::get('/students/{student}', [StudentController::class, 'show'])->name('students.show');
    Route::put('/students/{student}/update', [StudentController::class, 'update'])->name('students.update');
    Route::delete('/students/{student}/delete', [StudentController::class, 'destroy'])->name('students.destroy');

    Route::get('/requirements', [RequirementController::class, 'index'])->name('requirements.index');
    Route::post('/requirement/store', [RequirementController::class, 'store'])->name('requirements.store');
    Route::put('/requirement/{id}/update', [RequirementController::class, 'update'])->name('requirements.update');
    Route::delete('/requirement/{id}/delete', [RequirementController::class, 'destroy'])->name('requirements.destroy');

    Route::post('/student/file/store', [StudentFileController::class, 'store'])->name('studentfiles.store');
    Route::get('/student/file/download/{id}', [StudentFileController::class, 'download'])->name('studentfiles.download');
    Route::get('/student/file/{studentFile}', [StudentFileController::class, 'show'])->name('studentfiles.show');
    Route::delete('student/file/{studentFile}/delete', [StudentFileController::class, 'destroy'])->name('studentfiles.destroy');

    Route::post('/share/file/{id}', [ShareController::class, 'store'])->name('share');
    Route::get('/shared/{id?}', [ShareController::class, 'index'])->name('share.index');

    Route::get('/activity-log', [ActivityController::class, 'index'])->name('activity.log');
});
