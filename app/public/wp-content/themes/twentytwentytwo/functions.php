<?php
/**
 * Twenty Twenty-Two functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_Two
 * @since Twenty Twenty-Two 1.0
 */


if ( ! function_exists( 'twentytwentytwo_support' ) ) :

	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * @since Twenty Twenty-Two 1.0
	 *
	 * @return void
	 */
	function twentytwentytwo_support() {

		// Add support for block styles.
		add_theme_support( 'wp-block-styles' );

		// Enqueue editor styles.
		add_editor_style( 'style.css' );
	}

endif;

add_action( 'after_setup_theme', 'twentytwentytwo_support' );

if ( ! function_exists( 'twentytwentytwo_styles' ) ) :

	/**
	 * Enqueue styles.
	 *
	 * @since Twenty Twenty-Two 1.0
	 *
	 * @return void
	 */
	function twentytwentytwo_styles() {
		// Register theme stylesheet.
		$theme_version = wp_get_theme()->get( 'Version' );

		$version_string = is_string( $theme_version ) ? $theme_version : false;
		wp_register_style(
			'twentytwentytwo-style',
			get_template_directory_uri() . '/style.css',
			array(),
			$version_string
		);

		// Enqueue theme stylesheet.
		wp_enqueue_style( 'twentytwentytwo-style' );
	}

endif;

add_action('admin_notices', function() {
	echo '<div class="notice notice-success is-dismissible">
						<p>functions.php is loaded successfully!</p>
				</div>';
});
add_action( 'wp_enqueue_scripts', 'twentytwentytwo_styles' );
require get_template_directory() . '/inc/block-patterns.php';
function enqueue_vue() {
	if (is_front_page()) {
    wp_register_script('vue', get_template_directory_uri().'/vue/dist/assets/index-Cu7nBgTW.js', array(), null, true);
    wp_enqueue_script('vue');
	}
}
function add_type_attribute($tag, $handle) {
	if (($handle === 'vue' || $handle === 'react') && strpos($tag, '<script')) {
		if (!strpos($tag, 'type=')) $tag = str_replace('<script ', '<script type="module"', $tag);
		if (!strpos($tag, 'crossorigin=')) $tag = str_replace('<script ', '<script crossorigin="anonymous"', $tag);
		return $tag;
	}
	return $tag;
}
add_action('wp_enqueue_scripts', 'enqueue_vue');
add_filter('script_loader_tag', 'add_type_attribute', 10, 2);