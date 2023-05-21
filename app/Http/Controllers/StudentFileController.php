<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Requirement;
use App\Models\StudentFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class StudentFileController extends Controller
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
        if (Auth::user()->role_id != 2) {
            abort(403);
        }

        // dd($request);
        
        $request->validate([
            'requirement' => 'required',
            'file' => 'required|file|mimes:pdf',
            'file.*' => 'mimes:pdf',
            'student_id' => 'required'
        ]);

        $requirement = Requirement::find($request->requirement);

        $student = Student::find($request->student_id);
        $name = $requirement->name.'_'.$student->formal_full_name.'.'.pathinfo($request->file->getClientOriginalName(), PATHINFO_EXTENSION);

        $path = $request->file->storeAs($student->year.'/'.$student->formal_full_name, $name);

        StudentFile::create([
            'requirement_id' => $request->requirement,
            'path' => $path,
            'name' => $name,
            'student_id' => $request->student_id,
        ]);

        return redirect()->back()->withFlash(['success',$requirement->name.' uploaded']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StudentFile  $studentFile
     * @return \Illuminate\Http\Response
     */
    public function show(StudentFile $studentFile)
    {
        return response()->file(Storage::path($studentFile->path));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StudentFile  $studentFile
     * @return \Illuminate\Http\Response
     */
    public function edit(StudentFile $studentFile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StudentFile  $studentFile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StudentFile $studentFile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StudentFile  $studentFile
     * @return \Illuminate\Http\Response
     */
    public function destroy(StudentFile $studentFile)
    {
        //
    }

    /**
     * Download file
     */
    public function download($id)
    {
        if (Auth::user()->role_id != 2) {
            abort(403);
        }
        
        $file = StudentFile::find($id);

        return Storage::download($file->path, $file->name);
    }
}
