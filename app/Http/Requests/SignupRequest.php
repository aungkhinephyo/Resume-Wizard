<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'email' => 'required|email|string|unique:users,email',
            'password' => [
                'required', 'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'password.required' => 'The password field is required.',
            'password.confirmed' => 'The password confirmation does not match.',
            'password.min' => "At least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            'password.mixed_case' => "At least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            'password.numbers' => "At least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            'password.symbols' => "At least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        ];
    }
}
