<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostCreateRequest;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserPostController extends Controller {

	private PostService $postService;

	public function __construct( PostService $postService ) {
		$this->postService = $postService;
	}

	public function show( Post $post ) {
		return Inertia::render( 'single-post', [
			'post' => $this->postService->getSingle( $post ),
		] );
	}

	public function store( PostCreateRequest $request ) {

		try {
			$this->postService->create( $request );

			return to_route( 'dashboard' );
		} catch ( \Exception $e ) {
			return redirect()->back()->with( 'error', 'Failed to create post: ' . $e->getMessage() );
		}
	}

	public function update( Request $request, $postId ) {
	}

	public function destroy( $postId ) {
	}
}
