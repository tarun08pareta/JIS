<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\CourtCase;
use App\Models\Schedule;
use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
        RoleSeeder::class,
        UserSeeder::class,
        CourtCaseSeeder::class,
        // ScheduleSeeder::class
    ]);
    // CourtCase::factory(50)->create();
    // User::factory(10)->create();
    // Schedule::factory(50)->create();
    }
}
