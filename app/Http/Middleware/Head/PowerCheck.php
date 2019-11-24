<?php

namespace App\Http\Middleware\Head;

use Closure;
use Illuminate\Support\Facades\Auth;

class PowerCheck
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
        if (Auth::check() && Auth::user()->user_permissions != 1) {
            return $next($request);
        } else {
            if ($request->ajax()) {
                return response()->fail(403, '权限不足！', null, 403);
            } else {
                return response()->view('error.403', ['isadmin'=>'true'], 403);
            }
        }
    }
}
