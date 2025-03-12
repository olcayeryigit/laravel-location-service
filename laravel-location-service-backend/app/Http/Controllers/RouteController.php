<?php

namespace App\Http\Controllers;

use App\Models\Route;
use Illuminate\Http\Request;

class RouteController extends Controller
{
     /**
     * Tüm rotaları getir.
     */
    public function index()
    {
        return response()->json(Route::all(), 200);
    }
    
    
     /**
     *Yeni rota ekle.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'start_location_id' => 'required|exists:locations,id',
            'end_location_id' => 'required|exists:locations,id',
            'distance' => 'required|numeric|min:0',
        ]);

        $route = Route::create($validatedData);
        return response()->json($route, 201);
    }
    


 /**
     *Belirli bir rotayı getir.
     */

    public function show($id)
    {
        $route = Route::find($id);
        if (!$route) {
            return response()->json(['message' => 'Rota bulunamadı'], 404);
        }
        return response()->json($route, 200);
    }


     /**
     *Rotayı güncelle.
     */
    public function update(Request $request, $id)
    {
        $route = Route::find($id);
        if (!$route) {
            return response()->json(['message' => 'Rota bulunamadı'], 404);
        }

        $validatedData = $request->validate([
            'start_location_id' => 'sometimes|exists:locations,id',
            'end_location_id' => 'sometimes|exists:locations,id',
            'distance' => 'sometimes|numeric|min:0',
        ]);

        $route->update($validatedData);
        return response()->json($route, 200);
    }


 /**
     *Rotayı sil.
     */

     public function destroy($id)
     {
         $route = Route::find($id);
         if (!$route) {
             return response()->json(['message' => 'Rota bulunamadı'], 404);
         }
 
         $route->delete();
         return response()->json(['message' => 'Rota başarıyla silindi'], 200);
     }

    }
