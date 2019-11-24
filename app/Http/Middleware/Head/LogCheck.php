<?php

namespace App\Http\Middleware\Head;

use App\Models\Articles;
use Closure;

class LogCheck
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
        $data = Articles::where('article_id', $request->route('id'))->first();
        if ($data) {
            return $next($request);
        } else {
            return response()->view('error.404', [], 404);
        }
    }
}
