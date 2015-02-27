<?php
/**
 * @package   <%= name %>.
 * @author    <%= author %> <${ authorEmail }>
 * @copyright Copyright (C) <%= year %> <%= author %>
 */

defined('_JEXEC') or die;

// Load module helper
include_once __DIR__ . '/helper.php';

// Instantiate the helper
$helper = new <%= mainClassName %>Helper($params);

// Load something
$something = $helper->getSomething();

// Parse the template file
require JModuleHelper::getLayoutPath('<%= name %>', $params->get('layout', 'default'));