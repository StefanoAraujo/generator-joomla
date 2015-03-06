<?php
/**
 * @package   <%= name %>.
 * @author    <%= author %> <${ authorEmail }>
 * @copyright Copyright (C) <%= year %> <%= author %>
 * @license   <%= license %>
 */

defined('_JEXEC') or die;

// Load module helper
include_once __DIR__ . '/helper.php';

// Miscellaneous
$base = JUri::root(true);
$doc  = JFactory::getDocument();

// Load something
$something = mod<%= className %>::getSomething();

// Add assets
$doc->addStyleSheet($base . '/modules/<%= name %>/assets/css/main.css');
$doc->addStyleSheet($base . '/modules/<%= name %>/assets/js/main.js');

// Parse the template file
require JModuleHelper::getLayoutPath('<%= name %>', $params->get('layout', 'default'));