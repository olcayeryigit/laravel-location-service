<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLocationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'latitude' => 'required|numeric|between:-90,90',   // Enlem -90 ile 90 arasında olmalı
            'longitude' => 'required|numeric|between:-180,180', // Boylam -180 ile 180 arasında olmalı
            'marker_color' => 'nullable|string|max:20',
        ];
    }

    public function messages()
    {
        return [
            'latitude.between' => 'Latitude must be between -90 and 90.',
            'longitude.between' => 'Longitude must be between -180 and 180.',
        ];
    }
}
