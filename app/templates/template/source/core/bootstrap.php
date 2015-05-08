<?php
/**
 * @copyright
 */

defined('_JEXEC') or die;

include_once 'template.php';

// Initialize template helper, which provide some tools to control Joomla! output
$template = new Template($this);
$template->clear_meta();

// Add styles and scripts
$template->css(['main.css', '//fonts.googleapis.com/css?family=Lato:400,700']);
$template->script(['jquery.js', 'foo.js']);