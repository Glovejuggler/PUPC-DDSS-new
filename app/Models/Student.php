<?php

namespace App\Models;

use App\Models\StudentFile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'year'
    ];

    protected $appends = [
        'full_name',
        'formal_full_name'
    ];

    public function getFullNameAttribute()
    {
        return $this->middle_name ?
            $this->first_name.' '.$this->middle_name[0].'. '.$this->last_name :
            $this->first_name.' '.$this->last_name;
    }

    public function getFormalFullNameAttribute()
    {
        return $this->middle_name ?
            $this->last_name.', '.$this->first_name.' '.$this->middle_name :
            $this->last_name.', '.$this->first_name;
    }

    // Filters
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('first_name','like','%'.$search.'%')
                    ->orWhere('last_name','like','%'.$search.'%')
                    ->orWhere('year','=',$search);
            });
        })->when($filters['sortBy'] ?? null, function ($query, $sort) {
            if ($sort === '1') {
                $query->orderBy('first_name', 'desc');
            } elseif ($sort === '2') {
                $query->orderBy('first_name', 'asc');
            } elseif ($sort === '3') {
                $query->orderBy('year', 'asc');
            }
        })->when($filters['filterBy'] ?? null, function ($query, $filterBy) {
            $query->whereHas('files', function ($query) use($filterBy) {
                $query->where('type', $filterBy);
            });
        });
    }

    // Relations
    public function files()
    {
        return $this->hasMany(StudentFile::class);
    }
}
