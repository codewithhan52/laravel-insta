<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PostImage>
 */
class PostImageFactory extends Factory {
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array {
		return [
			'image_src' => "https://placehold.co/600x400/" . str_replace( '#', '', $this->faker->hexColor() ) . "/FFF?text=" . $this->faker->unique()->words( 1, true ),
			'post_id'   => Post::factory(),
		];
	}
}
