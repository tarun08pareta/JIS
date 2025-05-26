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
        Schema::create('schedules', function (Blueprint $table) {
             $table->uuid('id')->primary();
            $table->uuid('case_id');
            $table->dateTime('date');
            $table->string('location');
            $table->text('description');
            $table->enum('status', ['scheduled', 'completed', 'cancelled'])->default('scheduled');

            $table->timestamps();

            // Foreign key to court_cases table
            $table->foreign('case_id')
                  ->references('id')
                  ->on('court_cases')
                  ->onDelete('cascade');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
