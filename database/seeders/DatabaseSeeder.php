<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\PostComment;
use App\Models\PostImage;
use App\Models\PostLike;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
	/**
	 * Seed the application's database.
	 */
	public function run(): void {
		$this->postSeeder( $this->userSeeder() );
	}

	private function userSeeder() {

		$testUser = User::firstOrCreate(
			[ 'email' => 'test@example.com' ],
			[
				'name'              => 'Test User',
				'password'          => 'password',
				'email_verified_at' => now(),
			]
		);

		return User::factory( 10 )->create()->push( $testUser );
	}

	private function postSeeder( $users ) {

		// create posts for each user
		$users->each( function ( $user ) use ( $users ) {
			$postsCount = rand( 2, 5 );

			Post::factory( $postsCount )->create( [
				'user_id' => $user->id,
			] )->each( function ( $post ) use ( $users ) {
				PostImage::factory( rand( 1, 3 ) )->create( [
					'post_id' => $post->id,
				] );

				// seed dummy likes
				$likesCount  = rand( 0, 10 );
				$randomUsers = $users->random( min( $likesCount, $users->count() ) );

				foreach ( $randomUsers as $randomUser ) {
					PostLike::factory()->create( [
						'post_id' => $post->id,
						'user_id' => $randomUser->id,
					] );
				}

				// seed comments
				$commentsCount = rand( 0, 8 );
				for ( $i = 0; $i < $commentsCount; $i ++ ) {
					$comment = PostComment::factory()->create( [
						'post_id' => $post->id,
						'user_id' => $users->random()->id,
					] );

					// seed replies to comments
					if ( rand( 1, 100 ) <= 30 ) {
						PostComment::factory()->create( [
							'post_id'   => $post->id,
							'user_id'   => $users->random()->id,
							'parent_id' => $comment->id,
						] );
					}
				}
			} );
		} );
	}
}
