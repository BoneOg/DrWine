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
            $table->id('reservationID');

            $table->unsignedBigInteger('customerID');
            $table->foreign('customerID')
                ->references('customerID')
                ->on('customer')
                ->onDelete('cascade');

            $table->foreignId('tableId')
                ->constrained('restaurant_tables', 'tableId')
                ->onDelete('cascade');

            $table->dateTime('date_time');
            $table->integer('size');
            $table->enum('status', ['confirmed', 'cancelled', 'completed'])->default('confirmed');
            $table->boolean('preorder_food')->default(false);
            $table->integer('duration')->default(120);
            $table->timestamps();
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