<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TimelineController extends Controller {

	public function index(): \Inertia\Response {
		return Inertia::render( 'timeline', [] );
	}
}
