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
        Schema::create('resumes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->foreignIdFor(App\Models\User::class, 'user_id');
            $table->longText('personal_info')->nullable();
            $table->longText('social_links')->nullable();
            $table->longText('education')->nullable();
            $table->longText('experiences')->nullable();
            $table->longText('skills')->nullable();
            $table->longText('languages')->nullable();
            $table->longText('projects')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resumes');
    }
};
