<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLocationRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Kullanıcı yetkilendirmesi gerekiyorsa burada kontrol edebilirsin.
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'marker_color' => 'nullable|string|max:20'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Konum adı zorunludur.',
            'name.string' => 'Konum adı metin olmalıdır.',
            'name.max' => 'Konum adı en fazla 255 karakter olabilir.',
            'latitude.required' => 'Enlem değeri zorunludur.',
            'latitude.numeric' => 'Enlem sayısal bir değer olmalıdır.',
            'latitude.between' => 'Enlem -90 ile 90 arasında olmalıdır.',
            'longitude.required' => 'Boylam değeri zorunludur.',
            'longitude.numeric' => 'Boylam sayısal bir değer olmalıdır.',
            'longitude.between' => 'Boylam -180 ile 180 arasında olmalıdır.',
            'marker_color.string' => 'Renk kodu metin olmalıdır.',
            'marker_color.max' => 'Renk kodu en fazla 20 karakter olabilir.'
        ];
    }
}
