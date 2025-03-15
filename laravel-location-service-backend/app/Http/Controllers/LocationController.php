<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLocationRequest;
use App\Models\Location;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

 class LocationController extends Controller
{
   /**
     * Yeni bir lokasyon oluştur.
     */
    public function store(StoreLocationRequest $request): JsonResponse
    {
        $location = Location::create($request->validated());

        return response()->json($location, 201);
    }
    
      /**
     * Tüm konumları getir.
     */
    public function index(){
        $locations=Location::all();
        return response()->json($locations);
    }

    /**
     * Belirli bir konumu getir.
     */
    public function show($id)
    {
        $location = Location::find($id);

        if (!$location) {
            return response()->json(['message' => 'Location not found'], 404);
        }

        return response()->json($location);
    }


     /**
     * Belirli bir konumu güncelle.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'marker_color' => 'nullable|string|max:20'
        ]);

        $location = Location::find($id);

        if (!$location) {
            return response()->json(['message' => 'Location not found'], 404);
        }

        $location->update($request->all());

        return response()->json($location);
    }

    /**
     * Belirli bir konumu sil.
     */
    public function destroy($id)
    {
        $location = Location::find($id);

        if (!$location) {
            return response()->json(['message' => 'Location not found'], 404);
        }

        $location->delete();

        return response()->json(['message' => 'Location deleted successfully']);
    }
}