<?php
/**
 * @package   <%= name %>.
 * @author    <%= author %> <${ authorEmail }>
 * @copyright Copyright (C) <%= creationYear %> <%= author %>
 * @license   <%= license %>
 */

defined('_JEXEC') or die;

/**
 * Class mod<%= nameCamelcase %>Helper
 */
class mod<%= nameCamelcase %>Helper
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
	public static function getSomething()
	{
		return true;
	}
}