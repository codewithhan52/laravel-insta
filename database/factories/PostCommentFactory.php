<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PostComment>
 */
class PostCommentFactory extends Factory {
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array {
		return [
			'message'   => fake()->sentence(),
			'parent_id' => null,
			'post_id'   => Post::factory(),
			'user_id'   => User::factory(),
		];
	}

	/**
	 * Indicate that the comment is a reply to another comment.
	 */
	public function reply( int $parentId ): static {
		return $this->state( fn( array $attributes ) => [
			'parent_id' => $parentId,
		] );
	}
}
