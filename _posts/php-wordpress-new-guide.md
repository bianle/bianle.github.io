title: WordPress新站需要修改的7个代码
date: 2015-06-05 09:57:10
categories: php
tags: [wordpress]
---
1. 修改默认登录logo
```
function custom_login_logo() {    
    echo '<style type="text/css">    
        h1 a { background-image:url('.get_bloginfo('template_directory').'/images/login_logo.png) !important; }    
    </style>';    
}    
add_action('login_head', 'custom_login_logo');
```

2. 预览模式下取消google分析自动运行
```
if( !is_preview()):    
  # Google Analytics Code #    
endif;
```

3. 激活小工具段代码
```
add_filter('widget_text', 'do_shortcode');
```

4. 启用网站维护模式
```
function maintenace_mode() {
     if ( !current_user_can( 'administrator' ) ) 
            { wp_die('The site will be up soon.'); 
           } 
} 
add_action('get_header', 'maintenace_mode');
```

5. 取消更新通知
```
if ( !current_user_can('administrator') ) {    
    add_action( 'init', create_function( '$a', "remove_action( 'init', 'wp_version_check' );" ), 2 );    
    add_filter( 'pre_option_update_core', create_function( '$a', "return null;" ) );    
}
```

6. 取消自我追踪
```
function disable_self_ping( &$links ) {
     foreach ( $links as $l => $link )
         if ( 0 === strpos( $link, get_option( 'home' ) ) )
             unset($links[$l]); } 
add_action( 'pre_ping', 'disable_self_ping' );
```

7. 自定义可是编辑器css
```
$your_custom_stylesheet = 'css/custom-editor-style.css';    
add_editor_style($your_custom_stylesheet);
```
