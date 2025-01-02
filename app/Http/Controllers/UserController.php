<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getUser()
    {
        $user = Auth::user();

        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
    }

    public function updatePhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required',
        ]);

        $user = Auth::user();

        if ($request->hasFile('photo')) {

            $file = $request->file('photo');

            $path = $file->storeAs('uploads', time() . '_' . $file->getClientOriginalName(), 'public');

            $user->photo = $path;
            $user->save();

            return response()->json(['photo' => $path]);
        }

        return response()->json(['error' => 'No photo uploaded'], 400);
    }

    public function loginAuth(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required'
        ], [
            'email.required' => 'Email wajib diisi!',
            'password.required' => 'Password wajib diisi!'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (Auth::attempt($request->only(['email', 'password']))) {
            $user = Auth::user();
            return response()->json(['success' => 'Login berhasil', 'user' => $user], 200);
        } else {
            return response()->json(['error' => 'Login gagal, silahkan coba lagi'], 401);
        }
    }

    public function registerPost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ], [
            'name.required' => 'Nama harus diisi',
            'email.required' => 'Email harus diisi',
            'password.required' => 'Password harus diisi',
            'password.min' => 'Password minimal 6 karakter. ',
            'password.confirmed' => 'Konfirmasi Password tidak sesuai',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if ($user) {
            return response()->json(['success' => 'Registrasi berhasil, silahkan login!'], 201);
        } else {
            return response()->json(['error' => 'Gagal mendaftar, coba lagi'], 500);
        }
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('login')->with('logout', 'Anda telah Logout!');
    }
}
