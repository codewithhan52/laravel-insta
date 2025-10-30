<?php

use App\Http\Controllers\Apps\HomeController;
use Illuminate\Support\Facades\Route;

Route::get( '/', [ HomeController::class, 'index' ] )
     ->middleware( 'guest' )
     ->name( 'home' );

require __DIR__ . '/settings.php';
