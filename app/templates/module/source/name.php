<?php
/**
 * @copyright
 */

defined('_JEXEC') or die;

// Load module helper
include_once __DIR__ . '/helper.php';

$helper = new mod<%= nameCamelcase %>Helper($params);

// Parse the template file
require JModuleHelper::getLayoutPath('<%= name %>', $params->get('layout', 'default'));