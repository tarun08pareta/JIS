<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
   use HasFactory;
   use HasUuids;

    protected $fillable = ['name'];

   public function users()
    {
        return $this->hasManyThrough(
            User::class,
            RoleUser::class,
            'role_id', // Foreign key on RoleUser table
            'id', // Foreign key on User table
            'id', // Local key on Role table
            'user_id' // Local key on RoleUser table
        );
    }
}
