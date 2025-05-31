<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB; // Add this line

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // IMPORTANT: This uses raw SQL which is database-specific (MySQL example).
        // Adjust if you are using a different database (e.g., PostgreSQL).
        DB::statement("ALTER TABLE users MODIFY role ENUM('admin', 'user', 'guest', 'staff') DEFAULT 'guest'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // When rolling back, if any 'staff' roles exist, they will become 'guest'.
        // Handle this carefully if you have actual staff users.
        // You might need to update existing 'staff' roles to 'admin' or 'user' first.
        DB::statement("ALTER TABLE users MODIFY role ENUM('admin', 'user', 'guest') DEFAULT 'guest'");
    }
};