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
			$posts = $posts->inRandomOrder( '1' );
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

	public function getSingle( Post $post ): Post {
		return $post
			->load( [
				'user',
				'postImages',
				'postComments' => function ( $query ) {
					$query->whereNull( 'parent_id' )->with( [ 'user', 'replies.user' ] );
				}
			] )
			->loadCount( [ 'postLikes', 'postComments' ] )
			->loadCount( [
				'postLikes as is_liked' => function ( $query ) {
					$query->where( 'user_id', auth()->id() );
				}
			] );
	}

	public function create( Request $request ): Post {

		$post = auth()->user()->posts()->create( [
			'caption' => $request->caption,
		] );

		if ( ! empty( $request->images ) ) {
			foreach ( $request->images as $image ) {
				$post->postImages()->create( [
					'image_src' => $this->uploadService->uploadImage( $image, $post ),
				] );
			}
		}

		return $post;
	}

	public function setRandom( bool $random ): void {
		$this->random = $random;
	}

	public function setPerPage( int $perPage ): void {
		$this->perPage = $perPage;
	}
}