<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $roles = [
        ['name' => 'Judge'],
        ['name' => 'Lawyer'],
        ['name' => 'Registrar']
    ];

    foreach ($roles as $role) {
        Role::create($role);
    }
    }
}
