<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'first_name' => $this->faker->firstName($gender = null),
            'last_name' => $this->faker->lastName(),
            'middle_name' => $this->faker->lastName(),
            'year' => $this->faker->numberBetween(2009, 2022),
            'course' => $this->faker->randomElement([
                'BSIT', 'BSENT', 'BTLED'
            ]),
        ];
    }
}
