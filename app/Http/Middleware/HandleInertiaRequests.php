<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, \Closure|mixed>
     */
   public function share(Request $request): array
    {
        return [
            ...parent::share($request),

            // Share authenticated user
            'auth' => [
                'user' => $request->user(),
            ],

            // Flash messages (for success/errors, etc.)
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'errors' => fn () => $request->session()->get('errors'),
            ],

            // Ziggy for route() support in JS
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],

            // Cache-Control Headers (Prevents Back Navigation after Logout)
            'cacheHeaders' => [
                'Cache-Control' => 'private, max-age=0, no-cache, no-store, must-revalidate',
                'Pragma' => 'no-cache',
                'Expires' => '0'
            ],
        ];
    }
}
