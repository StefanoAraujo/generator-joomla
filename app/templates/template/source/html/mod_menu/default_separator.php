<?php
/**
 * @copyright
 */

defined('_JEXEC') or die;

$attributes = array();

// add item image
if ($item->menu_image)
{
	$link_content = '<img src="' . $item->menu_image . '" alt="' . $item->title . '" />';

	// add item image text
	if ($item->params->get('menu_text', 1))
	{
		$link_content .= '<span class="image-title">' . $item->title . '</span>';
	}
}
else
{
	// only text without image
	$link_content = $item->title;
}

// add link title
if ($item->anchor_title)
{
	$attributes['title'] = $item->anchor_title;
}

// print item
$title = $item->anchor_title ? 'title="' . $item->anchor_title . '"' : '';
echo '<span class="separator" $title>' . $link_content . '</span>';
