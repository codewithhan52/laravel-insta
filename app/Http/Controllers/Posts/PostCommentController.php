<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostComment;
use App\Services\PostCommentService;
use Illuminate\Http\Request;

class PostCommentController extends Controller {

	private PostCommentService $postCommentService;

	public function __construct( PostCommentService $postCommentService ) {
		$this->postCommentService = $postCommentService;
	}

	public function store( Post $post, Request $request ) {
		$this->postCommentService->createComment( $post, $request );

		return to_route( 'posts.show', $post );
	}

	public function destroy( Post $post, PostComment $postComment ) {
		$this->postCommentService->deleteComment( $postComment );

		return to_route( 'posts.show', $post );
	}
}
