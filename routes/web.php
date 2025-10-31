<?php

use App\Http\Controllers\Apps\HomeController;
use App\Http\Controllers\Apps\ProfileController;
use App\Http\Controllers\Apps\TimelineController;
use App\Http\Controllers\Posts\PostCommentController;
use App\Http\Controllers\Posts\PostCommentReplyController;
use App\Http\Controllers\Posts\PostLikeController;
use App\Http\Controllers\Posts\UserPostController;
use Illuminate\Support\Facades\Route;

Route::get( '/', [ HomeController::class, 'index' ] )
     ->middleware( 'guest' )
     ->name( 'home' );

Route::middleware( [ 'auth', 'verified' ] )->group( function () {

	Route::get( '/timeline', [ TimelineController::class, 'index' ] )->name( 'dashboard' );
	Route::get( '/me', [ ProfileController::class, 'index' ] )->name( 'me' );

	Route::prefix( 'posts' )->name( 'posts.' )->group( function () {

		// User Posts
		Route::post( '/create', [ UserPostController::class, 'store' ] )->name( 'create' );
		Route::put( '/{post}/edit', [ UserPostController::class, 'update' ] )->name( 'edit' );
		Route::delete( '/{post}/delete', [ UserPostController::class, 'destroy' ] )->name( 'delete' );

		// Post Interactions
		Route::post( '{post}/like', [ PostLikeController::class, 'store' ] )->name( 'like' );
		Route::post( '{post}/unlike', [ PostLikeController::class, 'destroy' ] )->name( 'unlike' );
		Route::post( '{post}/comment', [ PostCommentController::class, 'store' ] )->name( 'comment.store' );
		Route::post( '{post}/comments/{postComment}/reply', [ PostCommentReplyController::class, 'store' ] )->name( 'comment.reply' );
		Route::delete( '{post}/comments/{postComment}/delete', [ PostCommentController::class, 'destroy' ] )->name( 'comment.delete' );
	} );
} );

require __DIR__ . '/settings.php';
