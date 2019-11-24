<?php

namespace App\Http\Middleware\Head;

use App\Models\Articles;
use Closure;
use Illuminate\Support\Facades\Auth;

class IsLogCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->route('id')) {
            $data = Articles::where('article_id', $request->route('id'))->first();
            if ($data) {
                if ($data->article_user_id != Auth::id()) {
                return response()->view('error.404', [], 404);
                } else {
                    return $next($request);
                }
            } else {
                return response()->view('error.404', [], 404);
            }
        } else {
            return $next($request);
        }
    }
}
