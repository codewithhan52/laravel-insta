<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostComment;
use Illuminate\Http\Request;

class PostCommentReplyController extends Controller {

	public function store( Post $post, PostComment $postComment ) {
		//
	}
}
