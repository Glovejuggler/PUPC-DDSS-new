<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Requirement;
use App\Models\StudentFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreStudentRequest;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (Auth::user()->role_id != 2) {
            abort(403);
        }

        if ($request->wantsJson()) {
            return Student::query()
                            ->filter($request->only(['search', 'sortBy', 'filterBy']))
                            ->orderBy('year','desc')
                            ->orderBy('last_name')
                            ->paginate(40)
                            ->withQueryString();
        }

        return inertia('Students/Index', [
            'students' => Student::query()
                                    ->filter($request->only(['search', 'sortBy', 'filterBy']))
                                    ->orderBy('year','desc')
                                    ->orderBy('last_name')
                                    ->paginate(40)
                                    ->withQueryString(),
            'filters' => $request->only(['search', 'sortBy', 'filterBy']),
            'requirements' => Requirement::all()
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
    public function store(StoreStudentRequest $request)
    {
        Student::create($request->validated());

        return redirect()->back()->withFlash(['success', 'Student data created']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student)
    {
        if (Auth::user()->role_id != 2) {
            abort(403);
        }
        
        $submitted = StudentFile::where('student_id',$student->id)->pluck('requirement_id');

        return inertia('Students/Show', [
            'student' => Student::with('files')->find($student->id),
            'requirements' => Requirement::all()->groupBy('category'),
            'reqops' => Requirement::whereNotIn('id',$submitted)->get()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(StoreStudentRequest $request, Student $student)
    {
        $student->update($request->validated());

        return redirect()->back()->withFlash(['success', 'Student data updated']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $student)
    {
        if (Auth::user()->role_id != 2) {
            abort(403);
        }

        $student->delete();

        return redirect()->route('students.index')->withFlash(['success', 'Student deleted']);
    }
}
