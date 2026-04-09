<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  $role
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!$request->user() || $request->user()->role !== $role) {
            // If they are admin, they can access anything. 
            // Otherwise, if they don't match the specific role, abort.
            if ($request->user() && $request->user()->role === 'admin') {
                return $next($request);
            }
            
            abort(403, 'Akses tidak dibenarkan.');
        }

        return $next($request);
    }
}
