<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLocationRequest;
use App\Http\Requests\UpdateLocationRequest;
use App\Services\LocationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class LocationController extends Controller
{
    protected LocationService $locationService;

    public function __construct(LocationService $locationService)
    {
        $this->locationService = $locationService;
    }

    /**
     * Yeni bir lokasyon oluştur.
     */
    public function store(StoreLocationRequest $request): JsonResponse
    {
        $location = $this->locationService->create($request->validated());

        return response()->json($location, 201);
    }

    /**
     * Tüm konumları getir.
     */
    public function index(): JsonResponse
    {
        $locations = $this->locationService->getAll();
        return response()->json($locations);
    }

    /**
     * Belirli bir konumu getir.
     */
    public function show($id): JsonResponse
    {
        try {
            $location = $this->locationService->getById($id);
            return response()->json($location);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    /**
     * Belirli bir konumu güncelle.
     */
    public function update(UpdateLocationRequest $request, $id): JsonResponse
    {
        try {
            $location = $this->locationService->update($id, $request->validated());
            return response()->json($location);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    /**
     * Belirli bir konumu sil.
     */
    public function destroy($id): JsonResponse
    {
        try {
            $this->locationService->delete($id);
            return response()->json(['message' => 'Location deleted successfully']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
