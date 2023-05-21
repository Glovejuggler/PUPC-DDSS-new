<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::id() == 1;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'required',
            'middle_nane' => 'required',
            'last_name' => 'required',
            'birthday' => 'date|required',
            'address' => 'required',
            'contact' => 'required|numeric',
            'role_id' => 'required',
            'email' => 'email|required|unique:users',
            'password' => 'required|min:8'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'role_id.required' => 'A role must be assigned to this user',
            'contact.numeric' => 'Invalid contact number',
        ];
    }
}
