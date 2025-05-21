<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => 'required|string',
            'userName' => 'required|string|unique:users,userName',
            'email' => 'required|email|unique:users,email',
            'mobileNo' => 'required|string',
            'gender' => 'required|in:male,female,other',
            'password' => 'required|min:6',
            'roles' => 'array|exists:roles,id',
        ];
    }
}
