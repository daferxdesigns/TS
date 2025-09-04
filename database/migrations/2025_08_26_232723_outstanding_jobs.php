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
        Schema::create('outstandingjobs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('client_id');
            $table->string('installer_id')->nullable();
            $table->string('componentry')->nullable();
            $table->string('installation_date');
            $table->string('notes')->nullable();
            $table->string('pre-approval')->nullable();
            $table->string('sales')->nullable();
            $table->string('rebate')->nullable();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
