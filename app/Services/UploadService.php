<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;

class UploadService {

	/**
	 * @param $file
	 * @param null $object
	 *
	 * object can be db model
	 *
	 * @return string
	 */
	public function uploadImage( $file, $object = null ): string {

		$folder = 'uploads';

		if ( $object instanceof Model ) {
			$folder = strtolower( class_basename( $object ) ) . 's';
		}

		return $file->store( $folder, 'public' );
	}
}