<?php

namespace App\Http\Controllers;

use App\Services\RouteService;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    protected $routeService;

    public function __construct(RouteService $routeService)
    {
        $this->routeService = $routeService;
    }

    public function calculateRoute(Request $request)
    {
        $request->validate([
            'start_location_id' => 'required|exists:locations,id',
        ]);

        $route = $this->routeService->calculateOptimalRoute($request->start_location_id);

        if ($route === null) {
            return response()->json(['message' => 'Başlangıç noktası bulunamadı.'], 404);
        }

        if (empty($route)) {
            return response()->json(['message' => 'Başlangıç noktasından farklı konumlar bulunamadı.'], 404);
        }

        return response()->json([
            'start_location' => $route->first(),
            'route' => $route->values(),
        ]);
    }
}
