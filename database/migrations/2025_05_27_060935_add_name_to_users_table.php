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
        Schema::table('users', function (Blueprint $table) {
            // Add the 'name' column. We'll place it after 'username' if 'username' exists.
            // Otherwise, it will be placed where Laravel typically puts 'name' (after id or email).
            // Make it nullable initially if you're not populating it right away for existing users.
            // Or make it non-nullable and provide a default, or populate it via a data migration.
            // For now, let's make it nullable and add it after 'username' for clarity.
            if (Schema::hasColumn('users', 'username')) {
                $table->string('name')->after('username')->nullable();
            } else {
                $table->string('name')->after('id')->nullable(); // Fallback if 'username' isn't there
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop the 'name' column if the migration is rolled back
            $table->dropColumn('name');
        });
    }
};