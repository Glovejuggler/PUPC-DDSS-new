<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Requirement;
use App\Models\StudentFile;
use Illuminate\Support\Str;
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
        if (Auth::user()->role_id != 2 || Auth::user()->role_id != 3) {
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

        $new = StudentFile::create([
            'requirement_id' => $request->requirement,
            'path' => $path,
            'name' => $name,
            'student_id' => $request->student_id,
        ]);

        activity()
                ->causedBy(Auth::user())
                ->performedOn($new)
                ->withProperties(['name' => $new->name])
                ->event('uploaded')
                ->log(Auth::user()->role_id);

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
        if (Auth::user()->role_id != 2) {
            abort(403);
        }

        Storage::delete($studentFile->path);
        $studentFile->delete();

        return redirect()->back();
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

    /**
     * Too lazy so I made this :omegalul:
     */
    public function automate(Request $request)
    {
        $student = Student::find($request->student_id);
        $count = 0;

        foreach ($request->file as $file) {
            $fileName = Str::beforeLast($file->getClientOriginalName(), '.pdf');
            $requirement;
            $name;
            $path;

            if ($fileName == 'sar') {
                $requirement = Requirement::find(1);
            } else if ($fileName == 'good moral') {
                $requirement = Requirement::find(3);
            } else if ($fileName == 'med') {
                $requirement = Requirement::find(4);
            } else if ($fileName == 'psa') {
                $requirement = Requirement::find(5);
            } else if ($fileName == 'f137') {
                $requirement = Requirement::find(6);
            } else if ($fileName == 'g10') {
                $requirement = Requirement::find(10);
            } else if ($fileName == 'g11') {
                $requirement = Requirement::find(11);
            } else if ($fileName == 'g12') {
                $requirement = Requirement::find(12);
            } else if ($fileName == 'cert of non-issuance') {
                $requirement = Requirement::find(13);
            } else {
                continue;
            }
            
            if (!StudentFile::where('student_id', $student->id)->where('requirement_id', $requirement->id)->exists()) {
                $name = $requirement->name.'_'.$student->formal_full_name.'.'.pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                $path = $file->storeAs($student->year.'/'.$student->formal_full_name, $name);
                StudentFile::create([
                    'requirement_id' => $requirement->id,
                    'path' => $path,
                    'name' => $name,
                    'student_id' => $request->student_id,
                ]);

                $count += 1;
            }
        }

        return redirect()->back()->withFlash(['success', $count.' '.Str::plural('file', $count).' uploaded']);
    }

    public function dashboard()
    {
        return inertia('Requirements/Dashboard', [
            'requirements' => Requirement::whereDoesntHave('sub')->withCount('students')->get(),
            'studentCount' => Student::all()->count()
        ]);
    }
}
