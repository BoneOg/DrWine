<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Only add the column if it doesn't already exist to prevent errors
        if (!Schema::hasColumn('transaction', 'status')) {
            Schema::table('transaction', function (Blueprint $table) {
                // You can adjust the default value and position ('after') as needed
                // Common transaction statuses: 'pending_payment', 'paid', 'failed', 'refunded', 'cancelled'
                $table->string('status')->default('pending_payment')->after('payment_method');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaction', function (Blueprint $table) {
            // Drop the column if it exists when rolling back
            if (Schema::hasColumn('transaction', 'status')) {
                $table->dropColumn('status');
            }
        });
    }
};