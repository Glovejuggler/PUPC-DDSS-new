<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Requirement;
use App\Models\StudentFile;
use Illuminate\Http\Request;
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
        $request->validate([
            'requirement' => 'required',
            'file' => 'required|file',
            'file.*' => 'mimes:pdf',
            'student_id' => 'required'
        ]);

        $requirement = Requirement::find($request->requirement);

        $student = Student::find($request->student_id);
        $name = $requirement->name.'_'.$student->full_name.'.'.pathinfo($request->file->getClientOriginalName(), PATHINFO_EXTENSION);

        $path = $request->file->storeAs($student->year.'/'.$student->full_name, $name, 'public');

        StudentFile::create([
            'category' => $requirement->category,
            'type' => $requirement->name,
            'path' => $path,
            'name' => $name,
            'student_id' => $request->student_id,
        ]);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StudentFile  $studentFile
     * @return \Illuminate\Http\Response
     */
    public function show(StudentFile $studentFile)
    {
        //
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
        $file = StudentFile::find($id);

        return Storage::disk('public')->download($file->path, $file->name);
    }
}
