<?php

namespace App\Services;

use App\Models\Post;

class PostLikeService {

	public function like( Post $post ): void {
		$post->postLikes()->updateOrCreate( [
			'user_id' => auth()->id(),
		] );
	}

	public function unlike( Post $post ): void {
		$post->postLikes()
		     ->where( 'user_id', auth()->id() )
		     ->delete();
	}
}