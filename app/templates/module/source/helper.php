<?php
/**
 * @copyright
 */

defined('_JEXEC') or die;

/**
 * Class mod<%= nameCamelcase %>Helper
 */
class mod<%= nameCamelcase %>Helper
{
	/**
	 * The parameters of the module.
	 *
	 * @var array
	 */
	protected $params = null;

	/**
	 * @param array $params
	 */
	public function __construct(Joomla\Registry\Registry $params = null)
	{
		$this->params = $params;
	}
}