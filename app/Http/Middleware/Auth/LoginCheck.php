<?php

namespace App\Http\Middleware\Auth;

use Closure;
use Illuminate\Support\Facades\Auth;

class LoginCheck
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
        if (Auth::check()) {
            return $next($request);
        } else {
            if ($request->ajax()) {
                return response()->fail(403, '权限不足！', null, 403);
            } else {
                return response()->view('error.403', ['isadmin' => 'false'], 403);
            }
        }
    }
}
