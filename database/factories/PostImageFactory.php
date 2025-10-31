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
			'image_src' => "https://picsum.photos/id/" . $this->faker->numberBetween( 1, 200 ) . "/600/400?grayscale",
			'post_id'   => Post::factory(),
		];
	}
}
