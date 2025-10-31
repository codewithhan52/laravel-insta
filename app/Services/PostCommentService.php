<?php

namespace App\Services;

use App\Models\Post;
use App\Models\PostComment;
use Illuminate\Http\Request;

class PostCommentService {

	public function createComment( Post $post, Request $request, $parent_id = null ): Post {

		$post->postComments()->create( [
			'message'   => $request->message,
			'user_id'   => $request->user()->id,
			'parent_id' => $parent_id,
		] );

		return $post;
	}

	public function deleteComment( PostComment $postComment ): void {

		if ( $postComment->user_id === auth()->id() ) {
			$postComment->delete();
		}
	}
}