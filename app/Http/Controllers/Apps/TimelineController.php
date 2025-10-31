<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Services\PostService;
use Inertia\Inertia;
use Inertia\Response;

class TimelineController extends Controller {

	private PostService $postService;

	public function __construct( PostService $postService ) {
		$this->postService = $postService;
	}

	public function index(): Response {

		$this->postService->setRandom( true );

		return Inertia::render( 'timeline', [
			'posts' => Inertia::scroll( fn() => $this->postService->getAll() )
		] );
	}
}
