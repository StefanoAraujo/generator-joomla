<?php
/**
 * @package   <%= name %>.
 * @author    <%= author %> <${ authorEmail }>
 * @copyright Copyright (C) <%= year %> <%= author %>
 * @license   <%= license %>
 */

defined('_JEXEC') or die;

/**
 * Class plg<%= group.capitalizeFirstLetter() %><%= className %>
 */
class plg<%= group.capitalizeFirstLetter() %><%= className %> extends JPlugin
{
	<% if(group == 'custom') { %>
	/**
	 * Your custom event.
	 *
	 * @return bool
	 */
	public function onCustomEventName()
	{
		return true;
	}
	<% } %>
}