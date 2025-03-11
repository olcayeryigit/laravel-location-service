<?php

namespace App\Http\Controllers;
use App\Models\Location;
use Illuminate\Http\Request;

 class LocationController extends Controller
{
   /**
     * Yeni bir lokasyon oluştur.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'marker_color' => 'nullable|string|max:20'
        ]);

        $location = Location::create($request->all());

        return response()->json($location, 201);
    }    
}