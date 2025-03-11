<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


    return new class extends Migration {
        public function up(): void
        {
            Schema::create('route',function(Blueprint $table){
                $table->id();
                $table->foreignId('start_location')->constrained('locations')->onDelete('cascade');
                $table->foreignId('end_location_id')->constrained('locations')->onDelete('cascade');
                $table->decimal('distance',8,2);
                $table->timestamps();
            });
        }



        public function down():void{
            Schema::dropIfExists('routes');
        }
};