<?php

use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'user_student_number' => '00000000000',
            'user_name' => '超级管理员',
            'user_grade' => '0000',
            'user_major' => '超级专业',
            'user_password' => bcrypt('123456'),
            'user_permissions' => '0',
        ]);
    }
}
