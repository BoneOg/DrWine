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
            // Corrected: Referencing 'reservation' table and its 'reservationID' primary key
            $table->foreignId('reservationID')->constrained('reservation', 'reservationID')->onDelete('cascade');
            $table->integer('amount');
            $table->enum('transaction_type', ['reservation', 'food'])->default('reservation');
            $table->enum('payment_method', ['cash', 'card'])->nullable();
            $table->timestamps(); // This correctly adds 'created_at' and 'updated_at'
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