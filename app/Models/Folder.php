<?php

namespace App\Models;

use App\Models\File;
use App\Models\User;
use App\Models\Share;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Folder extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'parent_folder_id', 'name', 'user_id'
    ];

    protected $appends = [
        'size'
    ];

    public function ancestors()
    {
        return $this->belongsTo(Folder::class, 'parent_folder_id');
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
}
