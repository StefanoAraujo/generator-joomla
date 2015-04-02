<?php
/**
 * @copyright
 */

defined('_JEXEC') or die;

/**
 * A custom module chrome for your template.
 *
 * @param $module
 * @param $params
 * @param $attribs
 */
function modChrome_custom($module, &$params, &$attribs)
{ ?>
	<div class="<?php echo $params->get('moduleclass_sfx'); ?>module custom">
		<?php if ($module->showtitle): ?>
			<h4 class="<?php echo $params->get('header_class'); ?>"><?php echo $module->title; ?></h4>
		<?php endif; ?>

		<div>
			<?php echo $module->content; ?>
		</div>
	</div>
<?php }