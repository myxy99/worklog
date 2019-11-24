<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rotations extends Model
{
    protected $table = 'rotations';
    protected $primaryKey = 'rotation_id';
    public $timestamps = false;
    public $guarded = ['rotation_id'];

    public function getAll(){
        return $this->select('rotation_picture_url','rotation_click_url')->get();
    }
}
