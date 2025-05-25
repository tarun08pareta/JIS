<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\CourtCase;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourtCase>
 */
class CourtCaseFactory extends Factory
{
   protected $model = CourtCase::class;

    public function definition()
    {
        // Create users with all required fields if they don't exist
        $judge = User::where('role', 'judge')->first() ??
                 User::factory()->create([
                     'role' => 'judge',
                     'userName' => 'judge_' . Str::random(8),
                 ]);

        $lawyer = User::where('role', 'lawyer')->first() ??
                  User::factory()->create([
                      'role' => 'lawyer',
                      'userName' => 'lawyer_' . Str::random(8),
                  ]);

        $crimeTypes = ['Theft', 'Assault', 'Burglary', 'Fraud', 'Drug Possession', 'DUI', 'Robbery', 'Homicide'];
        $statuses = ['pending', 'ongoing', 'closed'];
        $locations = ['Downtown', 'Suburb', 'Industrial Area', 'Residential Area', 'Rural Area'];

        return [
            'defendantName' => $this->faker->name,
            'defendantAddress' => $this->faker->address,
            'crimeType' => $this->faker->randomElement($crimeTypes),
            'dateCommitted' => $this->faker->dateTimeBetween('-2 years', '-1 month')->format('Y-m-d'),
            'locationCommitted' => $this->faker->randomElement($locations),
            'arrestingOfficer' => 'Officer ' . $this->faker->lastName,
            'CIN' => 'CIN-' . $this->faker->unique()->numberBetween(10000, 99999),
            'judge_id' => $judge->id,
            'lawyer_id' => $lawyer->id,
            'status' => $this->faker->randomElement($statuses),
            'victim' => $this->faker->name,
        ];
    }
}
