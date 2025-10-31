<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostComment;
use App\Services\PostCommentService;
use Illuminate\Http\Request;

class PostCommentReplyController extends Controller {

	private PostCommentService $postCommentService;

	public function __construct( PostCommentService $postCommentService ) {
		$this->postCommentService = $postCommentService;
	}

	public function store( Post $post, PostComment $postComment, Request $request ) {
		$this->postCommentService->createComment( $post, $request, $postComment->id );

		return to_route( 'posts.show', $post );
	}
}
