<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof HttpException) {
            if ($exception->getStatusCode() == '404' || $exception->getStatusCode() == '500') {
                return response()->view('error.' . $exception->getStatusCode(), [], $exception->getStatusCode());
            } else {
                return response()->view('error.500', [], 500);
            }
        } else if ($exception instanceof AuthenticationException) {
            if ($request->ajax()) {
                return response()->fail('403', '权限不足', null, 403);
            } else {
                return response()->view('error.403', [], 403);
            }
        } else {
            return response()->view('error.500', [], 500);
        }
        // return parent::render($request, $exception);
    }
}
