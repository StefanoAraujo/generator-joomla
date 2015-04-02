<?php
/**
 * @copyright
 */

defined('_JEXEC') or die;

/**
 * Class plg<%= groupCamelcase %><%= nameCamelcase %>
 */
class plg<%= groupCamelcase %><%= nameCamelcase %> extends JPlugin
{
	<% if (group == 'system') { %>
	/**
	 * Triggered after the framework has loaded and the application initialise method has been called.
	 */
	public function onAfterInitialise()
	{
	}

	/**
	 * Triggered after the framework has loaded and initialised and the router has routed the client request.
	 */
	public function onAfterRoute()
	{
	}

	/**
	 * Triggered after the framework has dispatched the application.
	 */
	public function onAfterDispatch()
	{
	}

	/**
	 * Triggered immediately before the framework has rendered the application.
	 */
	public function onBeforeRender()
	{
	}

	/**
	 * Triggered after the framework has rendered the application.
	 */
	public function onAfterRender()
	{
	}

	/**
	 * Triggered before the framework creates the Head section of the Document.
	 */
	public function onBeforeCompileHead()
	{
	}
	<% } %>
}