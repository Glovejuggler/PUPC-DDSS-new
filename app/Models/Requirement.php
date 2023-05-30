<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
