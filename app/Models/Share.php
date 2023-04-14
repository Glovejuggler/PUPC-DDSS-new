<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Share extends Model
{
    use HasFactory;

    public function shareable()
    {
        return $this->morphTo();
    }

    public function subject()
    {
        return $this->morphTo();
    }

    protected $fillable = [
        'shareable_type',
        'shareable_id',
        'subject_type',
        'subject_id',
        'shared_by'
    ];
}
