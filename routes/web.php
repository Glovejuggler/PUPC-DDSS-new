<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\StudentController;
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

Route::get('/files/{id?}', [FileController::class, 'index'])->middleware(['auth', 'verified'])->whereNumber('id')->name('files');
Route::post('/upload/file', [FileController::class, 'store'])->name('files.upload');
Route::put('/file/rename/{id}', [FileController::class, 'rename'])->name('files.rename');
Route::get('/file/download/{id}', [FileController::class, 'download'])->name('files.download');

Route::post('/folder/store', [FolderController::class, 'store'])->name('folders.store');

Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::post('/users/store', [UserController::class, 'store'])->name('users.store');
Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
Route::put('/users/{id}/update', [UserController::class, 'update'])->name('users.update');

Route::get('/students', [StudentController::class, 'index'])->name('students.index');
Route::post('/students/store', [StudentController::class, 'store'])->name('students.store');
Route::get('/students/{student}', [StudentController::class, 'show'])->name('students.show');

Route::get('/requirements', [RequirementController::class, 'index'])->name('requirements.index');
Route::post('/requirement/store', [RequirementController::class, 'store'])->name('requirements.store');

Route::post('/student/file/store', [StudentFileController::class, 'store'])->name('studentfiles.store');
Route::get('/student/file/download/{id}', [StudentFileController::class, 'download'])->name('studentfiles.download');

require __DIR__.'/auth.php';
