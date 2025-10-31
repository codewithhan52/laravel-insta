<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class PostService {

	private int $perPage = 10;

	private bool $random = false;

	private UploadService $uploadService;

	public function __construct( UploadService $uploadService ) {
		$this->uploadService = $uploadService;
	}

	public function getAll(): LengthAwarePaginator {

		$posts = Post::query();

		if ( $this->random ) {
			$seed  = now()->startOfDay()->timestamp;
			$posts = $posts->inRandomOrder( $seed );
		} else {
			$posts = $posts->orderBy( 'created_at', 'desc' );
		}

		return $posts
			->with( [ 'user', 'postImages' ] )
			->withCount( [ 'postLikes', 'postComments' ] )
			->withCount( [
				'postLikes as is_liked' => function ( $query ) {
					$query->where( 'user_id', auth()->id() );
				}
			] )
			->paginate( $this->perPage );
	}

	public function setRandom( bool $random ): void {
		$this->random = $random;
	}

	public function setPerPage( int $perPage ): void {
		$this->perPage = $perPage;
	}
}