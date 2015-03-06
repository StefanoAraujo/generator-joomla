<?php
/**
 * @package   <%= name %>.
 * @author    <%= author %> <${ authorEmail }>
 * @copyright Copyright (C) <%= year %> <%= author %>
 * @license   <%= license %>
 */

defined('_JEXEC') or die;

/**
 * Class mod<%= className %>Helper
 */
class mod<%= className %>Helper
{
	/**
	 * @var array
	 */
	protected $params = array();

	/**
	 * @param array $params
	 */
	public function __construct($params = array())
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