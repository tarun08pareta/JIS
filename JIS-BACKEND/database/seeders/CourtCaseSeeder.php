<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\CourtCase;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CourtCaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
     public function run(): void
    {
        // Clear existing records
        CourtCase::truncate();

        // Get all judges and lawyers
        $judges = User::where('role', 'Judge')->get();
        $lawyers = User::where('role', 'Lawyer')->get();

        // Crime types for variety
        $crimeTypes = [
            'Theft', 'Burglary', 'Assault', 'Fraud', 'Drug Possession',
            'DUI', 'Domestic Violence', 'Vandalism', 'Cyber Crime', 'Robbery'
        ];

        // Locations for variety
        $locations = [
            'Downtown', 'Suburbia', 'Industrial District', 'Rural Area',
            'Shopping Mall', 'Residential Area', 'Park', 'Highway', 'School Zone'
        ];

        // Generate 50 sample court cases
        for ($i = 1; $i <= 50; $i++) {
            $randomJudge = $judges->random();
            $randomLawyer = $lawyers->random();

            $status = ['pending', 'ongoing', 'closed'][rand(0, 2)];

            // Generate a realistic date committed (between 1-5 years ago)
            $dateCommitted = now()->subDays(rand(365, 1825))->format('Y-m-d');

            CourtCase::create([
                'id' => Str::uuid(),
                'defendantName' => 'Defendant ' . $i,
                'defendantAddress' => rand(100, 9999) . ' ' .
                    ['Main St', 'Oak Ave', 'Pine Rd', 'Elm Blvd', 'Maple Dr'][rand(0, 4)] . ', ' .
                    ['Springfield', 'Shelbyville', 'Ogdenville', 'North Haverbrook', 'Capital City'][rand(0, 4)],
                'crimeType' => $crimeTypes[array_rand($crimeTypes)],
                'dateCommitted' => $dateCommitted,
                'locationCommitted' => $locations[array_rand($locations)],
                'arrestingOfficer' => 'Officer ' .
                    ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis'][rand(0, 6)],
                'CIN' => 'CIN-' . str_pad($i, 6, '0', STR_PAD_LEFT),
                'judge_id' => $randomJudge->id,
                'lawyer_id' => $randomLawyer->id,
                'status' => $status,
                'victim' => 'Victim ' . $i,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('Successfully seeded court cases!');
    }
}
