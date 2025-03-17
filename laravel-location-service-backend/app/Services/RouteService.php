<?php

namespace App\Services;

use App\Models\Location;
use App\Helpers\LocationHelper;
use Illuminate\Support\Collection;

class RouteService
{
    public function calculateOptimalRoute($startLocationId)
    {
        $startLocation = Location::find($startLocationId);
        if (!$startLocation) {
            return null;
        }

        $locations = Location::where('id', '!=', $startLocation->id)->get();

        if ($locations->isEmpty()) {
            return [];
        }

        $route = collect([$startLocation]);
        $currentLocation = $startLocation;

        while ($locations->isNotEmpty()) {
            // En yakın noktayı bul
            $closest = $locations->sortBy(fn ($loc) =>
                LocationHelper::haversineDistance(
                    $currentLocation->latitude, $currentLocation->longitude,
                    $loc->latitude, $loc->longitude
                )
            )->first();

            $route->push($closest);
            $locations = $locations->reject(fn ($loc) => $loc->id === $closest->id);
            $currentLocation = $closest;
        }

        return $route;
    }
}
