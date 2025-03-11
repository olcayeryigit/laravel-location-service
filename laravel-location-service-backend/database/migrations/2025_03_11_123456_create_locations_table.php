<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
     

    public function up(): void
    {
Schema::create('locations',function(Blueprint $table){
$table->id();
$table->string('name');
$table->decimal('latitude',10,8);
$table->decimal('longitude',11,8);
$table->string('marker_color',7); //hexadec renk kodu
$table->timestamps();

});
    }

        public function down():void {
            Schema::dropIfExists('locations');
        }


};