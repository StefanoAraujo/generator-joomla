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
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
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