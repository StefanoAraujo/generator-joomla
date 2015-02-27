<?php
/**
 * @package   <%= name %>.
 * @author    <%= author %> <${ authorEmail }>
 * @copyright Copyright (C) <%= year %> <%= author %>
 */

defined('_JEXEC') or die;

/**
 * Class <%= mainClassName %>Helper
 */
class <%= mainClassName %>Helper
{
	/**
	 * @var array
	 */
	protected $params = array();

	/**
	 * @param array $params
	 */
	function __construct($params = array())
	{
		$this->params = $params;
	}

	/**
	 * @return bool
	 */
	public function getSomething()
	{
		return true;
	}
}