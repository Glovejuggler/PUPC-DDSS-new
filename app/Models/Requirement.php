<?php

namespace App\Models;

use App\Models\Student;
use App\Models\StudentFile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Requirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_requirement_id',
        'category',
        'name'
    ];

    public function scopeMain($query)
    {
        $query->whereNull('parent_requirement_id');
    }

    public function sub()
    {
        return $this->hasMany(Requirement::class, 'parent_requirement_id');
    }

    public function students()
    {
        return $this->hasMany(StudentFile::class, 'requirement_id');
    }
}
