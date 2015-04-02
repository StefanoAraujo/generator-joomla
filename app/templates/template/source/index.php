<?php
/**
 * @copyright
 */

defined('_JEXEC') or die;

include_once 'core/bootstrap.php';
?>

<!doctype html>
<html lang="<?php echo $this->language; ?>">
<head>
	<jdoc:include type="head"/>
</head>
<body>
	<jdoc:include type="message"/>
	<jdoc:include type="component"/>

	<?php if ($this->countModules('right')): ?>
		<jdoc:include type="modules" name="right" style="none" foo="bar"/>
	<?php endif; ?>

	<?php if ($this->countModules('debug')): ?>
		<div id="joomla-debug">
			<jdoc:include type="modules" name="debug"/>
		</div>
	<?php endif; ?>
</body>
</html>