<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class HomeController extends Controller {

	public function index(): \Inertia\Response {
		return Inertia::render( 'auth/login', [
			'status'           => session( 'status' ),
			'canResetPassword' => Features::enabled( Features::resetPasswords() ),
			'canRegister'      => Features::enabled( Features::registration() ),
		] );
	}
}
