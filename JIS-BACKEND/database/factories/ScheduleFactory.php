<?php

namespace Database\Factories;

use App\Models\CourtCase;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Schedule>
 */
class ScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
       return [
            'case_id' => CourtCase::factory(),
            'date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'location' => 'Courtroom ' . $this->faker->numberBetween(1, 10),
            'description' => $this->faker->sentence(),
        ];
    }
}
