<?php

namespace App\Services;

use App\Models\Location;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class LocationService
{
    /**
     * Yeni bir konum oluştur.
     */
    public function create(array $data): Location
    {
        return Location::create($data);
    }

    /**
     * Tüm konumları getir.
     */
    public function getAll(): Collection
    {
        return Location::all();
    }

    /**
     * Belirli bir konumu getir.
     */
    public function getById(int $id): Location
    {
        $location = Location::find($id);

        if (!$location) {
            throw new ModelNotFoundException("Location not found");
        }

        return $location;
    }

    /**
     * Belirli bir konumu güncelle.
     */
    public function update(int $id, array $data): Location
    {
        $location = Location::find($id);

        if (!$location) {
            throw new ModelNotFoundException("Location not found");
        }

        $location->update($data);

        return $location;
    }

    /**
     * Belirli bir konumu sil.
     */
    public function delete(int $id): void
    {
        $location = Location::find($id);

        if (!$location) {
            throw new ModelNotFoundException("Location not found");
        }

        $location->delete();
    }
}
