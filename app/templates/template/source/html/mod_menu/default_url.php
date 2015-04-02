<?php
/**
 * @copyright
 */

defined('_JEXEC') or die;

$attributes = array();
$link_url   = $item->flink;

// add item image
if ($item->menu_image)
{
	$link_content = JHtml::image($item->menu_image, $item->title);

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

// if menu is deeper add icon
if ($item->deeper)
{
	$link_content .= '<span class="icon-radio-unchecked"></span>';
}

// add link class
if ($item->anchor_css)
{
	$attributes['class'] = $item->anchor_css;
}

// add link title
if ($item->anchor_title)
{
	$attributes['title'] = $item->anchor_title;
}

// sanitize link if item is a custom url
if ($item->type == 'url')
{
	$link_url = JFilterOutput::ampReplace(htmlspecialchars($item->flink));
}

// special attributes for target window types
switch ($item->browserNav)
{
	case 1:
		$attributes['target'] = '_blank';
		break;
	case 2:
		$options               = 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes';
		$attributes['onclick'] = "window.open(this.href, 'targetWindow', '$options');return false;";
		break;
}

// print the full link
echo JHtml::link($link_url, $link_content, $attributes);
