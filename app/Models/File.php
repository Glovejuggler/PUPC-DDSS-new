<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class File extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name', 'path', 'mime', 'size', 'folder_id', 'user_id'
    ];

    protected $appends = [
        'img_source'
    ];

    public function getImgSourceAttribute()
    {
        return Str::contains(Str::afterLast($this->mime, '/'), ['jpeg', 'png']) ? $this->path : '../fileicons/'.Str::afterLast($this->name, '.').'.png';
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
