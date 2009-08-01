(function($){
	$.fn.menuSuspenso = function(options){

        settings = jQuery.extend({
            onApply: function(){},
            onSelect: function(){}
        }, options);

		return this.each(function(){		
            var $this = $(this);
            var $list = '';
            var li = '';
            
            $('option', $this).each(function(i, item){
                li += '<li id="'+$(item).val()+'"><a href="#">'+$(item).html()+'</a></li>';
            });
            
            $list = $('<ul>'+li+'<ul>');
            
            $list.insertAfter($this);
            
            if (options.onApply) options.onApply($this, $list);
            
            $('a', $list).unbind('click.menu').bind('click.menu', function(){
                $('li', $list).removeClass('selected');
                $(this).parents('li:first').addClass('selected');
                $('option[value="'+$(this).parents('li:first').attr('id')+'"]', $this).attr('selected', 'selected');
                
                if (options.onSelect) options.onSelect($this, $list);
                return false;
            });
            
            $this.hide();
		});
		
	}
})(jQuery);
