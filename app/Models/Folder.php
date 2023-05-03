<?php

namespace App\Models;

use App\Models\File;
use App\Models\User;
use App\Models\Share;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Folder extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'parent_folder_id', 'name', 'user_id'
    ];

    protected $appends = [
        'size'
    ];

    public function ancestor()
    {
        return $this->belongsTo(Folder::class, 'parent_folder_id');
    }

    public function subfolders()
    {
        return $this->hasMany(Folder::class, 'parent_folder_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function shares()
    {
        return $this->morphMany(Share::class, 'shareable');
    }

    public function getSizeAttribute()
    {
        return $this->files->sum('size');
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name','like','%'.$search.'%');
            });
        })->when($filters['sortBy'] ?? null, function ($query, $sort) {
            if ($sort === '1') {
                $query->orderBy('name', 'desc');
            } elseif ($sort === '2') {
                $query->orderBy('created_at', 'asc');
            } elseif ($sort === '3') {
                $query->orderBy('created_at', 'desc');
            }
        });
    }
    
    public function scopeFolder($query, $bool, $id)
    {
        if (!$bool) {
            $query->where('parent_folder_id', $id);
        }
    }

    /**
     * Checks if user is admin
     * Else return folders that of the role of the user
     */
    public function scopeAdmin($query)
    {
        if (Auth::user()->role_id != 1) {
            $query->whereHas('user', function($q) {
                $q->where('role_id', Auth::user()->role_id);
            });
        }
    }
}
