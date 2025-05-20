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
        Schema::create('reservation', function (Blueprint $table) {
            $table->id('reservationID'); // Primary key for reservations
            $table->foreignId('customerID')->constrained('customer')->onDelete('cascade'); // Foreign key to customer table
            // Corrected: Referencing 'restaurant_tables' and its 'tableId' primary key
            $table->foreignId('tableId')->constrained('restaurant_tables', 'tableId')->onDelete('cascade'); // Foreign key to restaurant_tables table
            $table->dateTime('date_time'); // Date and time of the reservation
            $table->integer('size'); // Number of people for the reservation
            $table->enum('status', ['confirmed', 'cancelled', 'completed'])->default('confirmed'); // Status of the reservation
            $table->boolean('preorder_food')->default(false); // Indicates if food was preordered
            $table->integer('duration')->default(120); // Duration of the reservation in minutes (e.g., 120 for 2 hours)
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation');
    }
};