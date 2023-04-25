<?php

namespace App\Models;

use App\Models\User;
use App\Models\Share;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
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
        'img_source', 'is_image'
    ];

    public function getImgSourceAttribute()
    {
        // return $this->is_image ? 'storage/'.$this->path : '../fileicons/'.Str::afterLast($this->name, '.').'.png';
        if ($this->is_image) {
            if (!Storage::disk('thumbs')->exists($this->path)) {
                $file = Storage::get($this->path);
                Storage::disk('thumbs')->put($this->path, $file);
                $thumbPath = Storage::disk('thumbs')->path($this->path);
                $img = Image::make($thumbPath)->resize(360, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
                $img->save($thumbPath);
            }

            return '../thumbs/'.$this->path;
        } else {
            return '../fileicons/'.Str::afterLast($this->name, '.').'.png';
        }
    }

    public function getIsImageAttribute()
    {
        return Str::contains($this->mime, 'image');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function shares()
    {
        return $this->morphMany(Share::class, 'shareable');
    }

    public function folder()
    {
        return $this->belongsTo(Folder::class, 'folder_id');
    }
}
