<?php

namespace App\Http\Middleware\Head;

use App\Models\Articles;
use App\Models\StudyRoutes;
use Closure;

class LearnCheck
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
        $data = StudyRoutes::where('study_route_id', $request->route('id'))->first();
        if ($data) {
            return $next($request);
        } else {
            return response()->view('error.404', [], 404);
        }
    }
}
