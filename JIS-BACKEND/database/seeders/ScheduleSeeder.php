<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Schedule;
use App\Models\CourtCase;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Faker\Factory as Faker;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
             $faker = Faker::create();

        // Fetch all existing court cases
        $courtCases = CourtCase::all();

        if ($courtCases->isEmpty()) {
            $this->command->error('No CourtCase records found. Please seed CourtCase data first.');
            return;
        }

        // Seed 10 schedule records
        foreach (range(1, 50) as $i) {
            $randomCase = $courtCases->random(); // ✅ Fixed line

            Schedule::create([
                'id' => (string) Str::uuid(),
                'case_id' => $randomCase->id,
                'date' => Carbon::now()->addDays(rand(1, 30)),
                'location' => $faker->city . ' Court Room ' . rand(1, 5),
                'description' => $faker->sentence,
                'status' => $faker->randomElement(['scheduled', 'completed', 'cancelled']),
            ]);
        }

        $this->command->info('10 Schedules seeded successfully.');

    }
}
