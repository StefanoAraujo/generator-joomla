<?php
/**
 * @copyright
 */

defined('_JEXEC') or die;

/**
 * Class Template
 */
class Template
{
	/**
	 * @var
	 */
	private $document;

	/**
	 * @param JDocumentHTML $document
	 */
	function __construct(JDocumentHTML $document)
	{
		$this->document = $document;
	}

	/**
	 * Remove unuseful meta tags like content-type, generator, etc.
	 */
	public function clear_meta()
	{
		$this->document->setGenerator(null);

		unset($this->document->_metaTags['standard']['xreference']);
		unset($this->document->_metaTags['http-equiv']['content-type']);
		unset($this->document->_metaTags['standard']['author']);
	}

	/**
	 * Return a parameter of the site configuration.
	 *
	 * @param string $parameter The name of the parameter to retrieve.
	 *
	 * @return mixed The value of the parameter.
	 */
	public function site_config($parameter)
	{
		return JFactory::getConfig()->get($parameter);
	}

	/**
	 * Returns the absolute URL for a template asset.
	 *
	 * @param string        $file_relative The path of the file relative to the template folder.
	 * @param JDocumentHTML $document      The instance of the current Joomla Document.
	 *
	 * @return string The absolute path of that file.
	 */
	public function asset($file_relative)
	{
		return $this->document->baseurl . '/templates/' . $this->document->template . '/assets/' . $file_relative;
	}
}