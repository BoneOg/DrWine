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
        Schema::create('transaction', function (Blueprint $table) {
            $table->id('transactionID'); // Primary key for transactions
            // Foreign key to reservation table
            $table->foreignId('reservationID')->constrained('reservation', 'reservationID')->onDelete('cascade');
            $table->enum('status', ['confirmed', 'cancelled', 'completed'])->default('confirmed');
            $table->integer('amount');
            $table->enum('transaction_type', ['reservation', 'food'])->default('reservation');
            $table->enum('payment_method', ['GCash', 'Mastercard', 'Visa', 'PayMaya', 'PayPal'])->nullable();
            $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction');
    }
};
