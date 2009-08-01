/**
 * @author alexmagno
 */
(function($){
	
	$.extend({
		barra: function() {
            /*
             * Criando o dropdown do usuario com opcoes da conta
             */
			var $userlink = $("#link_usuario");
            $userlink.find('strong').textFormatter({
                length: 16
            });
            var dx = $userlink.parent().width();
            var pd_left = parseInt($userlink.parent().css('paddingLeft'));
            var dx_total = dx + pd_left;
           $userlink.toolTip({
                target: '#menu_usuario',
                posX: dx_total * (-1),
                posY: '29px'
            }, function(el, tg){
                $(el).parent().addClass('menu-hover-usuario');
            }, function(el, tg){
                $(el).parent().removeClass('menu-hover-usuario');
            });
	
		}
	});
	
})(jQuery);
