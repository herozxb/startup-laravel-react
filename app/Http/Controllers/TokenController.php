<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;

class TokenController extends Controller
{

    /**
     * Create and return a token if the user is logged in
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function token(\Tymon\JWTAuth\JWTAuth $auth)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'not_logged_in'], 401);
        }


        /*


          _id: 5fdf32d0d064dd1689ac3b8c,
          email: 't@email.com',
          username: 'Thinking',
          password: '$2a$12$i41IzoISMfzhy1Qz.Jtwuez5YrFvBOG6IVtcKTmd9EaBuW2yUjVFe',
          createdAt: '2020-12-20T11:17:36.582Z',
          __v: 0



    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    SECRET_KEY,
    { expiresIn: '1h' }



        //*/


/*
        // Claims will be sent with the token
        $user = Auth::user();
        //$claims = ['name' => $user->name, 'email' => $user->email];
        $claims = ['id' => "5fdf32d0d064dd1689ac3b8c", 'email' => "t@email.com", "username" => "Thinking"];

        $userdata = array(
            'id' => "5fdf32d0d064dd1689ac3b8c",
            'email' => "t@email.com",
            "username" => "Thinking"
        );

        $token = $auth->attempt($claims)
        // Create token from user + add claims data
        //$token = $auth->fromUser($user, $claims);

        if (!Auth::check()) {
            return response()->json(['error' => 'not_logged_in'], 401);
        }


        $claims = ['id' => "5fdf32d0d064dd1689ac3b8c", 'email' => "t@email.com", "username" => "Thinking"];
        #$token = $auth->attempt($claims)

        if (! $token = auth()->attempt($claims)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return response()->json(['token' => $token]);
//*/
        $claims = ['id' => "5fdf32d0d064dd1689ac3b8c", 'email' => "t@email.com", "username" => "Thinking"];

        //$payload = JWTFactory::make($claims);

        //$token = JWTAuth::encode($payload);
        $factory = JWTFactory::customClaims([
            'id' => "5fdf32d0d064dd1689ac3b8c", 'email' => "t@email.com", "username" => "Thinking",
             "iss" => "local",  "sub" => "data",   "jti" => "nbk3TCyqhjVPPniH",
             "nbf" => 1628232734,"iat"=> 1628234226,"exp"=> 1628237826,
        ]);

        $payload = $factory->make();

        $token = JWTAuth::encode($payload)->get();


        return response()->json(['token' => $token]);
    }

}
