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
        Schema::create('court_cases', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('defendantName');
            $table->string('defendantAddress');
            $table->string('crimeType');
            $table->date('dateCommitted');
            $table->string('locationCommitted');
            $table->string('arrestingOfficer');
            $table->string('CIN')->unique();
            $table->uuid('judge_id');
            $table->uuid('lawyer_id');
            $table->enum('status', ['pending', 'ongoing', 'closed'])->default('pending');
            $table->string('victim');

            $table->timestamps();

            // Foreign Keys
            $table->foreign('judge_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('lawyer_id')->references('id')->on('users')->onDelete('cascade');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('court_cases');
    }
};
