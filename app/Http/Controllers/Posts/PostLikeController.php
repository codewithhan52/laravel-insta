<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Services\PostLikeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostLikeController extends Controller {

	private PostLikeService $postLikeService;

	public function __construct( PostLikeService $postLikeService ) {
		$this->postLikeService = $postLikeService;
	}

	public function store( Post $post ) {

		$this->postLikeService->like( $post );

		return response( '' );
	}

	public function destroy( Post $post ) {

		$this->postLikeService->unlike( $post );

		return response( '' );
	}
}
