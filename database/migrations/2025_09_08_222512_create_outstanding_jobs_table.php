<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('outstanding_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('client_id')->nullable();
            $table->string('installer_id')->nullable();
            $table->string('name');
            $table->string('phone_number')->nullable();
            $table->text('address')->nullable();
            $table->string('expiry_date')->nullable();
            $table->string('rebate_type')->nullable();
            $table->string('componentry')->nullable();
            $table->string('installer')->nullable();
            $table->string('date_of_install')->nullable();
            $table->string('notes')->nullable();
            $table->string('sales', 10, 2)->nullable();
            $table->string('greendeal')->default(false);
            $table->string('ces')->default(false);
            $table->string('pre_approval')->default(false);
            $table->integer('rebate')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clientz');
    }
};
