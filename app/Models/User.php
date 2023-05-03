<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Role;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\CausesActivity;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, CausesActivity;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'email',
        'password',
        'birthday', 
        'address', 
        'contact',
        'role_id',
        'avatar'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = [
        'full_name', 'formal_full_name', 'view_avatar'
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

    public function getViewAvatarAttribute()
    {
        return $this->avatar ? '../storage/'.$this->avatar : '../../default.jpg';
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function setBirthdayAttribute($value)
    {
        $this->attributes['birthday'] = Carbon::parse($value);
    }
}
