<?php
/**
 * @package   <%= name %>.
 * @author    <%= author %> <${ authorEmail }>
 * @copyright Copyright (C) <%= year %> <%= author %>
 */

defined('_JEXEC') or die;

// Load module helper
include_once __DIR__ . '/helper.php';

// Miscellaneous
$base = JUri::root(true);
$doc  = JFactory::getDocument();

// Load something
$something = <%= mainClassName %>::getSomething();

// Add assets
$doc->addStyleSheet($base . '/modules/<%= mainClassName %>/assets/css/main.css');
$doc->addStyleSheet($base . '/modules/<%= mainClassName %>/assets/js/main.js');

// Parse the template file
require JModuleHelper::getLayoutPath('<%= name %>', $params->get('layout', 'default'));