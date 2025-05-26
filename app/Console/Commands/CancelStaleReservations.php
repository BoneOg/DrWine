<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Reservation;
use Carbon\Carbon;

class CancelStaleReservations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reservations:cancel-stale';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cancel pending reservations that are older than 2 hours';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $cutoffTime = Carbon::now()->subMinutes(1);

        $cancelledCount = Reservation::where('status', 'pending')
            ->where('created_at', '<=', $cutoffTime)
            ->update(['status' => 'cancelled']);

        $this->info("✅ Cancelled $cancelledCount pending reservation(s) older than 1 minute");
    }
}
