<?php

define('DS', DIRECTORY_SEPARATOR);
define('UPLAD_DIR', __DIR__ .DS. 'uploads');

if( !is_dir(UPLAD_DIR) ) {
	@mkdir(UPLAD_DIR, 0777);
}

function getFileExt($type)
{
	$minetypes = array(
		'image/png'		=> '.png',
		'image/jpeg'	=> '.jpg',
		'image/gif'		=> '.gif',
	);

	return isset($minetypes[$type]) ? $minetypes[$type] : '.png';
}

function upload($files)
{
	if( is_array($files) ) {
		$files = (array) $files;
	}
	
	$errors = array();

	foreach($files as $file) {
		if( $file['error'] === 0 ) {
			$name = $file['name'];
			$type = $file['type'];
			$tmp_name = $file['tmp_name'];
			$file = UPLAD_DIR .DS. $name .'_'.time(). getFileExt($type);
			if( !saveUpload($tmp_name, $file) ) {
				array_push($errors, 'upload faild.');
			}
		}
	}
}
function saveUpload($source, $target)
{
	return move_uploaded_file($source, $target);
}

$errors = upload($_FILES);
if( count($errors) ) {
	echo 'Faild';
} else{
	echo 'Success';
}