<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Route extends Model{
use HasFactory;
protected $fillable = ['start_location_id', 'end_location_id', 'distance'];


// Starting position relationship
public function startLocation(){
    return $this->belongsTo(Location::class,'start_location_id');
}

// End position relation
public function endLocation(){
    return $this->belongsTo(Location::class,'end_location_id');
} 

};
