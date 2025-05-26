<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Schedule;
use App\Models\CourtCase;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        // Get all cases
        $cases = CourtCase::all();

        if ($cases->isEmpty()) {
            $this->command->info('No cases found. Please seed cases first.');
            return;
        }

        foreach ($cases as $case) {
            // Create 1-3 schedules for each case
            $scheduleCount = rand(1, 3);

            for ($i = 0; $i < $scheduleCount; $i++) {
                Schedule::create([
                    'case_id' => $case->id,
                    'date' => Carbon::now()->addDays(rand(1, 30))->addHours(rand(9, 16)),
                    'location' => 'Courtroom ' . rand(1, 10),
                    'description' => 'Hearing #' . ($i + 1) . ' for ' . $case->defendantName
                ]);
            }
        }

        $this->command->info('Schedules seeded successfully.');
    }
}
