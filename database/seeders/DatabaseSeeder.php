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
            'first_name' => 'Glove',
            'last_name' => 'Juggler',
            'email' => 'aelizaga77@gmail.com',
            'password' => Hash::make('admin123'),
            'birthday' => Carbon::parse('02-10-2001'),
            'role_id' => 1,
            'address' => 'Calauan, Laguna',
            'contact' => '09554881539'
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
