<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\AdminController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::post('app/create_tag', [AdminController::class,'store']);
Route::get('app/get_tag', [AdminController::class,'get']);
Route::post('app/edit_tag', [AdminController::class,'edit']);
Route::post('app/delete_tag', [AdminController::class,'delete']);
Route::post('app/upload', [AdminController::class,'upload']);
Route::post('app/delete_image', [AdminController::class,'deleteImage']);

Route::get('app/get_category', [AdminController::class,'getCategory']);
Route::post('app/create_category', [AdminController::class,'storeCategory']);
Route::post('app/edit_category', [AdminController::class,'editCategory']);
Route::post('app/delete_category', [AdminController::class,'deleteCategory']);



Route::get('/', function(){
    return view('welcome');
});
Route::any('{slug}', function(){
    return view('welcome');
});
