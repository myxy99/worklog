<?php

namespace App\Http\Controllers\View;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    public function index()
    {
        return view('admin.index');
    }
    public function carousel_add()
    {
        return view('admin.carousel_add');
    }
    public function carousel()
    {
        return view('admin.carousel');
    }
    public function classification_add()
    {
        return view('admin.classification_add');
    }
    public function classification()
    {
        return view('admin.classification');
    }
    public function cover()
    {
        return view('admin.cover');
    }
    public function document()
    {
        return view('admin.document');
    }
    public function linksetting_add()
    {
        return view('admin.linksetting_add');
    }
    public function linksetting()
    {
        return view('admin.linksetting');
    }
    public function member_add()
    {
        return view('admin.member_add');
    }
    public function member()
    {
        return view('admin.member');
    }
    public function navigation_add()
    {
        return view('admin.navigation_add');
    }
    public function navigation()
    {
        return view('admin.navigation');
    }
    public function system()
    {
        return view('admin.system');
    }
    public function uploadtime()
    {
        return view('admin.uploadtime');
    }
    public function path()
    {
        return view('admin.path');
    }
    public function path_add()
    {
        return view('admin.path_add');
    }
}
