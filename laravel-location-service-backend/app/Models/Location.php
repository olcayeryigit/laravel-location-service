<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Routing\Route;

class Location extends Model{
use HasFactory;
protected $fillable=['name','latitude','longitude','marker_color'];

/* Relationship with routes (A location can be included in more than one route)*/
public function routes(){
    return $this->hasMany(Route::class);
}

};
