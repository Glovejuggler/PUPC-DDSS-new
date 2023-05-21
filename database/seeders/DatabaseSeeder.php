<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        DB::table('users')->insert([
            [
                'first_name' => 'Admin',
                'last_name' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('admin123'),
                'birthday' => Carbon::parse('01-10-1950'),
                'role_id' => 1,
                'address' => 'Pilipinas',
                'contact' => '000'
            ],
            [
                'first_name' => 'Registrar',
                'last_name' => 'Registrar',
                'email' => 'registrar@registrar.com',
                'password' => Hash::make('admin123'),
                'birthday' => Carbon::parse('01-10-1950'),
                'role_id' => 2,
                'address' => 'Pilipinas',
                'contact' => '000'
            ]
        ]);

        DB::table('roles')->insert([
            [
                'name' => 'Admin'
            ],
            [
                'name' => 'Registrar'
            ],
        ]);
    }
}
