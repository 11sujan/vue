<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
   

    public function name(){
       return response()->json([
           'msg' => 'some error occured'
       ], 422);
    }
}
