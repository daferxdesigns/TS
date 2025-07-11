<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // or add logic if needed
    }

    public function rules(): array
    {
        return [
            'comment' => 'required|string|max:2000',
        ];
    }
}
