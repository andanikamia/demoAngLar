<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Symfony\Component\HttpFoundation\Response;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request){
        if(!$this->validateEmail($request->email)){
            return $this->failedResponse();
        }

        $this->send($request->email);
        return $this->successResponse();
    }

    public function send($email){
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    public function createToken($email){
        $token = str_random(60);
        $oldToken = DB::table('password_resets')->where('email',$email)->first();

        if($oldToken){
            DB::table('password_resets')->where('email',$email)->update([
                'token' => $token,
                'created_at' => DB::raw('now()')
            ]);
        }
        else{
            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token,
                'created_at' => DB::raw('now()')
            ]);
        }

        return $token;
    }

    public function validateEmail($email){
        return !!User::where('email', $email)->first();
    }

    public function failedResponse(){
        return response()->json([
            'error' => 'Email doesn\'t found on database'
        ],Response::HTTP_NOT_FOUND);
    }

    public function successResponse(){
        return response()->json([
            'data' => 'Reset Email is send successfully, please check your inbox'
        ],Response::HTTP_OK);
    }
}
