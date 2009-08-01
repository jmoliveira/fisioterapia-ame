/* ToolTip Menu */
(function($){

	$.fn.toolTip = function(options, fn, fnOut){
		var $this = $(this);
		var setTimeOut = '';

		var options = $.extend({
			target: '.tooltip',
			trigger: 'click',
			eventOut: 'mouseout',
			timeout: 1000,
			timein: 0,
			posY: 0,
			posX: 0				
			}, options);  

		var mouseEnterTooltip = false;
		$(options.target).hide();
		
		this.each(function(){

		    if (options.remove) {
		        $(this)
				    .unbind(options.trigger)
				    .unbind(options.eventOut)

				return;
		    }

			$(this)
				.unbind(options.trigger)
				.unbind(options.eventOut)
				.bind(options.trigger, function() {

					$item = $(this);
					var _scope = this;
					
					var applyTooltip = function() {
							
						$this.addClass('box-off').removeClass('box-on');
						$item.addClass('box-on').removeClass('box-off');
						
						var topValue = $item.offset().top + parseInt(options.posY);
						var leftValue = $item.offset().left + $item.outerWidth() + parseInt(options.posX);
						
						$(options.target).css({
							top: topValue + 'px',
							left: leftValue + 'px'
						}).show();

						mouseEnterTooltip = true;
						if (fn != undefined) fn(_scope, $(options.target));
					
					};
					
					clearTimeout(setTimeOut); 
					( !options.timein && applyTooltip() ) || (setTimeOut = setTimeout(applyTooltip, options.timein));
					
					return false;	
		
		    	})		
				.bind(options.eventOut, function() {
				
					var $This = this;
					clearTimeout(setTimeOut); 
					setTimeOut = setTimeout(function() {
						if (!mouseEnterTooltip) {
							$(options.target).hide();
							$this.removeClass('box-on').addClass('box-off');
							if (fnOut != undefined) fnOut( $This, $(options.target));
						}							
					}, options.timeout);
					mouseEnterTooltip = false;

		    	})
			
			var item = $(this);
			$(options.target+':first')
				.bind('mouseenter', function() {

					mouseEnterTooltip = true;
					$(this).show();

			    })
				.bind('mouseleave', function() {

					mouseEnterTooltip = false;
					$(this).hide();
					
					if (fnOut != undefined) fnOut( item, $(options.target));

		    	});
		});
	    
	    $.closeToolTip = function(options) {

			mouseEnterTooltip = false;
			$this.removeClass('box-on').addClass('box-off');	

            if(options.target) {
                $(options.target).unbind();
			}

            if(options.tooltip) {
                $(options.tooltip).hide();
			}

		}
		
		return this;		
	};

})(jQuery);

/* Fim do ToolTip Menu */
