<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function calculateRoute(Request $request)
    {
        $request->validate([
            'start_location_id' => 'required|exists:locations,id',
        ]);

        $startLocation = Location::find($request->start_location_id);
        $locations = Location::where('id', '!=', $startLocation->id)->get();

        if ($locations->isEmpty()) {
            return response()->json(['message' => 'Başlangıç noktasından farklı konumlar bulunamadı.'], 404);
        }

        $route = collect([$startLocation]); // Rota başlangıcı
        $currentLocation = $startLocation;

        while ($locations->isNotEmpty()) {
            // En yakın noktayı bul
            $closest = $locations->sortBy(fn ($loc) =>
                $this->haversineDistance(
                    $currentLocation->latitude, $currentLocation->longitude,
                    $loc->latitude, $loc->longitude
                )
            )->first();

            $route->push($closest);
            $locations = $locations->reject(fn ($loc) => $loc->id === $closest->id); // Seçilen konumu listeden çıkar
            $currentLocation = $closest; // Yeni başlangıç noktası
        }

        return response()->json([
            'start_location' => $startLocation,
            'route' => $route->values(),
        ]);
    }

    // Haversine formülü ile mesafe hesaplama
    private function haversineDistance($lat1, $lon1, $lat2, $lon2)
    {
        $earthRadius = 6371; // Dünya yarıçapı (km)

        $latDelta = deg2rad($lat2 - $lat1);
        $lonDelta = deg2rad($lon2 - $lon1);

        $a = sin($latDelta / 2) * sin($latDelta / 2) +
            cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
            sin($lonDelta / 2) * sin($lonDelta / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c; // Mesafe (km)
    }
}
