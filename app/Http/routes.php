<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/api/index/{tripId}', 'TripController@index');

Route::get('/api/start/{tripId}', 'TripController@startTrip');

Route::get('/api/check-in/{tripId}/{locationId}', 'TripController@checkIn');

Route::get('/api/skip/{tripId}/{locationId}', 'TripController@skipLocation');

Route::get('trip/{id}', 'Test@index');

Route::get('/', 'Home@index');