<?php
/**
 * @copyright
 */

defined('_JEXEC') or die;

JHtml::stylesheet('modules/<%= name %>/assets/css/main.css');
JHtml::script('modules/<%= name %>/assets/js/main.js');
?>

<div class="<%= _.slugify(name) %>">
	<!-- Your code here -->
</div>