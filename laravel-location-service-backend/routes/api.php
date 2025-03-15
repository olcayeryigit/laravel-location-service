<?php
use App\Http\Controllers\LocationController;
use App\Http\Controllers\RouteController;
use Illuminate\Support\Facades\Route;

/*
Bu satır, Laravel'in sunduğu apiResource fonksiyonunu kullanarak LocationController için bir dizi otomatik rota oluşturur.
Route::apiResource('locations', LocationController::class); satırı, LocationController'daki tüm temel CRUD (Create, Read, Update, Delete) işlemlerini, tek bir satırla tanımlamanızı sağlar.
Ne Oluyor?
apiResource fonksiyonu, aşağıdaki gibi 5 adet rotayı otomatik olarak oluşturur:
GET /api/locations — index metodu: Tüm konumları getirir.
GET /api/locations/{id} — show metodu: Belirli bir konumu getirir.
POST /api/locations — store metodu: Yeni bir konum oluşturur.
PUT /api/locations/{id} — update metodu: Belirli bir konumu günceller.
DELETE /api/locations/{id} — destroy metodu: Belirli bir konumu siler.
*/

/*
/ayrı ayrı yazmak istersek 
Route::get('/locations', [LocationController::class, 'index']);
Route::get('/locations/{id}', [LocationController::class, 'show']);
Route::post('/locations', [LocationController::class, 'store']);
Route::put('/locations/{id}', [LocationController::class, 'update']);
Route::delete('/locations/{id}', [LocationController::class, 'destroy']);
*/

// Rate limit mekanizmasını tüm API'lere uyguluyoruz:
Route::middleware('throttle:api')->group(function () {
    // LocationController için CRUD işlemleri
    Route::apiResource('locations', LocationController::class);
    
    // Rota hesaplama için
    Route::post('/calculate-route', [RouteController::class, 'calculateRoute']);
});
