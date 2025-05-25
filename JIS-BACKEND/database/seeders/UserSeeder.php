<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
  public function run()
    {
        // Clear the table first
        User::truncate();

        // Create admin user
        User::create([
            'name' => 'Admin User',
            'userName' => 'admin',
            'email' => 'admin@example.com',
            'mobileNo' => '1234567890',
            'gender' => 'male',
            'role' => 'Registrar',
            'password' => Hash::make('password'),
        ]);

        // Create judges
        for ($i = 1; $i <= 5; $i++) {
            User::create([
                'name' => 'Judge ' . $i,
                'userName' => 'judge' . $i,
                'email' => 'judge' . $i . '@example.com',
                'mobileNo' => '555111' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'gender' => ($i % 2) ? 'male' : 'female',
                'role' => 'Judge',
                'password' => Hash::make('password'),
            ]);
        }

        // Create lawyers
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'name' => 'Lawyer ' . $i,
                'userName' => 'lawyer' . $i,
                'email' => 'lawyer' . $i . '@example.com',
                'mobileNo' => '555222' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'gender' => ($i % 2) ? 'male' : 'female',
                'role' => 'Lawyer',
                'password' => Hash::make('password'),
            ]);
        }

        $this->command->info('Successfully seeded users with roles!');
    }
}
