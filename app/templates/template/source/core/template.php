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
	 * Prepend a script (or scripts) before existent ones.
	 *
	 * @param string|array $filename
	 * @param bool         $defer
	 * @param bool         $async
	 */
	public function script($filename, $defer = false, $async = false)
	{
		$scripts = [];

		foreach ((array) $filename as $js)
		{
			$js           = preg_match('/\/\//', $js) ? $js : $this->asset('js/' . $js);
			$scripts[$js] = ['mime' => 'text/javascript', 'defer' => $defer, 'async' => $async];
		}

		$this->document->_scripts = $scripts + $this->document->_scripts;
	}


	/**
	 * Prepend a stylesheet (or stylesheets) before existent ones.
	 *
	 * @param string|array $filename
	 * @param bool         $defer
	 * @param bool         $async
	 */
	public function css($filename)
	{
		$styles = [];

		foreach ((array) $filename as $css)
		{
			$css          = preg_match('/\/\//', $css) ? $css : $this->asset('css/' . $css);
			$styles[$css] = ['mime' => 'text/css', 'media' => '', 'attribs' => []];
		}

		$this->document->_styleSheets = $styles + $this->document->_styleSheets;
	}

	/**
	 * Return a parameter of the template or of the site.
	 *
	 * @param string $name The name of the parameter to get.
	 *
	 * @return mixed The value of the parameter.
	 */
	public function config($name, $site_config = false)
	{
		return $site_config ? JFactory::getConfig()->get($name) : $this->document->params->get($name);
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