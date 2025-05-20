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
        // Modified: Changed table name from 'restaurant_table' to 'restaurant_tables' for consistency
        Schema::create('restaurant_tables', function (Blueprint $table) {
            $table->id('tableId'); // This correctly sets 'tableId' as the primary key
            $table->integer('table_number')->unique();
            $table->integer('capacity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Modified: Changed table name from 'table' to 'restaurant_tables' for consistency
        Schema::dropIfExists('restaurant_tables');
    }
};