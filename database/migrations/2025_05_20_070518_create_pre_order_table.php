<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('pre_order', function (Blueprint $table) {
            $table->id('preorderID'); // primary key with custom name

            $table->unsignedBigInteger('reservationID');
            $table->foreign('reservationID')
                ->references('reservationID')
                ->on('reservation')
                ->onDelete('cascade');

            $table->unsignedBigInteger('menu_itemID');
            $table->foreign('menu_itemID')
                ->references('menu_itemID')
                ->on('menu_item')
                ->onDelete('cascade');

            $table->unsignedInteger('quantity'); // unsigned integer for quantity

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('pre_order');
    }
};
