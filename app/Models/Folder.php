<?php

namespace App\Models;

use App\Models\User;
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

    public function ancestors()
    {
        return $this->belongsTo(Folder::class, 'parent_folder_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
