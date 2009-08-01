(function($){
	
	$.fn.popin = function(options, fn){
		
		var $this = $(this);

		var options = jQuery.extend({
            duration: 1000
		}, options); 
				
        /* Cria o popin */ 
		$this.css({
			position:'absolute',
			zIndex:9991
        });
	
	    if ($(window).height() > $this.height())
			$this.css({ top: $(window).height()/2 - $this.height()/2 + $(window).scrollTop() });
		else $this.css({ top: $(window).scrollTop() + 10 });
		
		if($(window).width() > $this.width())
	        $this.css({left: $(window).width()/2 - $this.width()/2});
		else $this.css({left: 10});

        // Ao redimensionar a janela, o popin se desloca para o centro da janela
		$(window).bind('resize.popin scroll.popin',function(){
		
			if ($(this).height() > $this.height()) {
				$this.css({top: $(this).height() / 2 - $this.height() / 2 + $(this).scrollTop()});
			}
			
			if($(this).width() > $this.width())	
				$this.css({left:$(this).width()/2 - $this.width()/2});
		});
		
		var $zoom = $('<div class="popin-zoom"></div>');
		$zoom
			.appendTo('body')
			.css({
				backgroundColor: '#000',
				display:'none',
				height: $(document).height(),
				width:'100%',
				opacity:0.6,
				position:'absolute',
				top:0,
				zIndex:9990
			});
			
		if ($('.popin-zoom').length == 0) {
			$zoom.appendTo('body');
		}
		
		$zoom.fadeIn(50);
		$this.fadeIn();
		
		$.closePopin = function(fn){
			$this.hide();
			$zoom.remove();
			$(window).unbind('.popin');
			if(fn && $.typeOf(fn) == 'function'){
			    fn();
			}
		}
	}
	
})(jQuery);
