<?php

namespace App\Http\Controllers\View;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Head\IndexController;

class HeadController extends Controller
{
    public function index()
    {
        $index =  new IndexController;
        return view('head.index', [
            'getNavigationBar' => $index->getNavigationBar()->getData()->data, 
            'getClassifyBar' => $index->getClassifyBar()->getData()->data,
            'getSlideshow' => $index->getSlideshow()->getData()->data
            ]);
    }

    public function learnPath()
    {
        return view('head.learnPath');
    }

    public function learnPathList()
    {
        $index =  new IndexController;
        return view('head.learnPathList', ['data' => $index->getClassifyBar()->getData()->data]);
    }

    public function log()
    {
        return view('head.log');
    }

    public function logDetails()
    {
        return view('head.logDetails');
    }

    public function logEdit()
    {
        $index =  new IndexController;
        return view('head.logEdit', ['data' => $index->getClassifyBar()->getData()->data]);
    }

    public function login()
    {
        if(Auth::check()){
     return redirect('/');
        }else{
        return view('head.login');
        }
    }
    public function personalLog(){
                    $index =  new IndexController;
        return view('head.personalLog',['data'=>$index->getClassifyBar()->getData()->data]);
    }
}
