<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudyRoutes extends Model
{
    protected $table = 'study_routes';
    protected $primaryKey = 'study_route_id';
    public $timestamps = false;
    public $guarded = ['route_id'];

    public function getAssignPath($id){
        return $this->select('study_route_title','study_route_intro','study_route_content','study_route_create_time','study_route_update_time','cover_picture_url','study_route_video_id')
            ->leftjoin('cover_pictures','study_routes.study_route_cover_picture_id','cover_pictures.cover_picture_id')
            ->where('study_route_id',$id)
            ->where('study_route_state',1)
            ->first();
    }

    public function getAllPath(){
        return $this->getPath()->leftjoin('categorys','categorys.category_id','study_routes.category_id');

    }
    public function getPath(){
        return $this->leftjoin('cover_pictures','study_routes.study_route_cover_picture_id','cover_pictures.cover_picture_id')
        ->where('study_route_state',1)
        ->select('study_route_id','study_route_title','study_route_intro','cover_picture_url')
        ->latest('study_route_create_time');
    }
}
