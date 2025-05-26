<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| Here you may define all of your Closure based console commands. Each
| Closure is bound to a command instance allowing a simple approach to
| interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->describe('Display an inspiring quote');

// Schedule your custom command to run every 5 minutes
Schedule::command('reservations:cancel-stale')->everyTwoHours();
