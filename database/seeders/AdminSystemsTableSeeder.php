<?php

namespace Database\Seeders;

use App\Models\AdminSystem;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSystemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Tạo một admin system
        $user = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make(12345678),
        ]);

        $user->adminSystem()->create([
            'phone' => "0332258398",
            'details' => "dai hoc quoc gia ha noi",
            'position' => "adminsystem",
            'birthday' => "20030914",
        ]);
    }
}

