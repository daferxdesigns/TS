<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'title' => ['sometimes',  'string'],
            'user_id' => ['sometimes',  'integer'],
            'serial_number' => ['sometimes', 'string'],
            'description' => ['sometimes', 'string'],
            'the_client' => ['nullable', 'integer'],
            'status' => ['sometimes', 'required', 'string', 'in:open,in_progress,pending,resolved,closed'],
        ];
    }


    public function attributes(): array
    {
        return [
            'user_id' => 'assigned to'
        ];
    }
}
