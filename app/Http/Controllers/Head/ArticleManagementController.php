<?php

namespace App\Http\Controllers\Head;

use App\Http\Requests\Head\ArticlePostRequest;
use App\Http\Requests\Head\CategoryIdGetRequest;
use App\Models\Articles;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

const ASUN = 1;
class ArticleManagementController extends Controller
{
    public function index(CategoryIdGetRequest $request, Articles $articles)
    {
        try {
            if ($request->input('category_id') == 0) {
                $result = $articles->getBase()->paginate(25);
            } else {
                $result = Articles::leftjoin('cover_pictures', 'articles.cover_picture_id', 'cover_pictures.cover_picture_id')
                ->leftjoin('categorys as t2','articles.article_category_id','t2.category_id')
                ->leftjoin('categorys as t1','t2.category_index','t1.category_id')
                ->where('article_state', 1)
                ->where('t1.category_id', '=', $request->category_id)
                ->orwhere('t2.category_id', '=', $request->category_id)
                ->select('article_id', 'article_title', 'article_intro', 'cover_picture_url')
                ->latest('article_create_time')
                ->paginate(25);
            }
        } catch (\Exception $e) {
            return response()->fail(100, '服务器错误!', null, 500);
        }
        if ($result->isEmpty()) {
            return response()->fail(100, '获取失败!', null);
        }
        $result->appends(['category_id' => $request->input('category_id')])->render();
        return response()->success(200, '获取成功!', $result);


            dd($res);

    }

    public function create()
    { }

    public function store(ArticlePostRequest $request, Articles $articles)
    {
        try {
            $result = $articles->create($request, $articles);
        } catch (\Exception $e) {
            return response()->fail(100, '服务器错误!', null, 500);
        }
        if ($result) {
            return response()->success(200, '添加成功!', null);
        }
        return response()->fail(100, '添加失败!', null);
    }

    public function show($id, Articles $articles)
    {
        try {
            $result = $articles->getAllArticles($id);
        } catch (\Exception $e) {
            return response()->fail(100, '服务器错误!', null, 500);
        }
        if (!isset($result)) {
            return response()->fail(100, '获取失败!', null);
        }
        return response()->success(200, '获取成功!', $result);
    }

    public function edit($id)
    { }

    public function update(Request $request, $id)
    {
        try {
            $result = (new Articles)->renewal($request, $id);
        } catch (\Exception $e) {
            return response()->fail(100, '服务器错误!', null, 500);
        }
        if ($result) {
            return response()->success(200, '修改成功!', null);
        }
        return response()->fail(100, '修改失败!', null);
    }

    public function destroy($id)
    {
        try {
            $result = (new Articles)->remove($id);
        } catch (\Exception $e) {
            return response()->fail(100, '服务器错误!', null, 500);
        }
        if ($result) {
            return response()->success(200, '删除成功!', null);
        }
        return response()->fail(100, '删除失败!', null);
    }
}
