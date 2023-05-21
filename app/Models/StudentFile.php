<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'requirement_id',
        'path',
        'name',
        'student_id'
    ];
}
