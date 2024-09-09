<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'GG,t-kW?*CF2e*Zd9i.njQuUgjGG_=7,Zk{doiP2i7Q.Xzczl57.;?mK !pyP5xt' );
define( 'SECURE_AUTH_KEY',   '03KQR~&>f6rCLy-y[QGs >LOYskk`Z{zTGycSI:8V@J^2<$2W5UQ)M@fblxCSTO:' );
define( 'LOGGED_IN_KEY',     '+ j;Uha0|G?QS{}rbQVjn-Ycd4g0B:u2;fLix^k@1#Bkc`VhA]EVet^s.U{YAkU*' );
define( 'NONCE_KEY',         ')JOS^v*l!]4j:fAf9Ibj|{C@h3#1td,FPSEb}Y3qMG<u4t}lrAEq.5IiP|d[1,XC' );
define( 'AUTH_SALT',         '&$f;cX?c`:$W)SNcX+ht<-0%GHGD>h7M2r%j>OCxB]XWmXzh-xZpLuoU^(uaA_Jr' );
define( 'SECURE_AUTH_SALT',  'fk>$he}&SWDtLAGI:6!fQT<+P3P#L)^.;j.t9-.r-NvPSK@Rf2No299cZz/BRc}h' );
define( 'LOGGED_IN_SALT',    'dGLm3/k.u#[pa(A6D/*7>p<S{-w8,jQVJ%>FR#8o!bo[O+52{*V.FX8#)`H^#5u,' );
define( 'NONCE_SALT',        'wVLcO<&#$d,U%}3W!uBpE&XX=9ePe=f~43QYFG<ISvRs_T9[h+5.)b9!nAq*[2SP' );
define( 'WP_CACHE_KEY_SALT', 'b&N3ZR0P)^,d]LtriceU`I{R?^$!Gm7 *Q)#o%,^vmj8^N36e_o9!$^Dn&v=(B{@' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
