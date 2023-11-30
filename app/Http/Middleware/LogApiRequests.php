<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class LogApiRequests
{
    public function handle($request, Closure $next)
    {
        $startTime = microtime(true);

        $response = $next($request);

        $endTime = microtime(true);
        $executionTime = ($endTime - $startTime) * 1000; // Chuyển đổi thời gian từ giây sang mili giây
        $formattedTime = Carbon::now()->format('Y-m-d H:i:s');

        Log::channel('stack')->info("{$formattedTime} {$request->method()}:\"{$request->fullUrl()}\" - Execution Time: {$executionTime}ms");

        return $response;
    }
}
