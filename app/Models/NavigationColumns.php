<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NavigationColumns extends Model
{
    protected $table = 'navigation_columns';
    protected $primaryKey = 'navigation_id';
    public $timestamps = false;
    public $guarded = ['navigation_id'];
    public function getAll(){
        return $this->select('navigation_id','navigation_columns_name','navigation_jump_url')->get();
    }
}
