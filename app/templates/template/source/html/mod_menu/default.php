<?php
/**
 * @copyright
 */

defined('_JEXEC') or die;

// Open the <ul> element
if ($tag_id = $params->get('tag_id'))
{
	echo "<ul id=\"$tag_id\" class=\"menu\">";
}
else
{
	echo '<ul class="menu">';
}

// Print the menu items
foreach ($list as $i => &$item)
{
	$class_A = array();

	// If the item is the active page
	if ($item->id == $active_id)
	{
		$class_A[] = 'current';
	}

	// If the item is active in path
	if (in_array($item->id, $path))
	{
		$class_A[] = 'active';
	}
	elseif ($item->type == 'alias')
	{
		$aliasToId = $item->params->get('aliasoptions');

		if (count($path) > 0 && $aliasToId == $path[count($path) - 1])
		{
			$class_A[] = 'active';
		}
		elseif (in_array($aliasToId, $path))
		{
			$class_A[] = 'alias-parent-active';
		}
	}

	// If the item is separator
	if ($item->type == 'separator')
	{
		$class_A[] = 'divider';
	}

	// If the item is deeper
	if ($item->deeper)
	{
		$class_A[] = 'deeper';
	}

	// If the item is parent
	if ($item->parent)
	{
		$class_A[] = 'has-dropdown';
	}

	// Open the <li> element
	if (count($class_A))
	{
		echo '<li class="' . implode(' ', $class_A) . '">';
	}
	else
	{
		echo '<li>';
	}

	// Print the element markup
	switch ($item->type)
	{
		case 'separator':
		case 'heading':
			require JModuleHelper::getLayoutPath('mod_menu', 'default_' . $item->type);
			break;
		default:
			require JModuleHelper::getLayoutPath('mod_menu', 'default_url');
			break;
	}

	// Open the sub-menu element if present
	if ($item->deeper)
	{
		echo '<ul class="dropdown">';
	}
	else
	{
		echo '</li>';
	}

	// Close the sub-menu <ul> if the element is the last of a sub-menu
	if ($item->shallower)
	{
		str_repeat('</ul></li>', $item->level_diff);
	}
}

echo '</ul>';

