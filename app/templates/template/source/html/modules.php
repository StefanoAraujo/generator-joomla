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
	<div class="module <?php echo $params->get('moduleclass_sfx'); ?> custom">
		<?php if ($module->showtitle): ?>
			<h4 class="<?php echo $params->get('header_class'); ?>"><?php echo $module->title; ?></h4>
		<?php endif; ?>
		<?php echo $module->content; ?>
	</div>
<?php }