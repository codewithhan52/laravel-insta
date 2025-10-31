<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostComment;
use Illuminate\Http\Request;

class PostCommentController extends Controller {

	public function store( Post $post, PostComment $postComment, Request $request ) {
		// Logic to store a comment or reply
	}

	public function destroy( Post $post, PostComment $postComment ) {
		// Logic to delete a comment
	}
}
