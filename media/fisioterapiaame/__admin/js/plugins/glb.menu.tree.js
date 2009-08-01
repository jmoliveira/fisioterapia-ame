(function($){
	$.fn.menuTree = function(options){
	    var options = jQuery.extend({
			trigger: '',
	        colapse: false
	    }, options);
	    	
	    if(options.colapse==true) {
	        $(this).children('li:has(ul)').removeClass('on').addClass('off');
	    }		
	    
		this.each(function(){		  		    		    
		    if(options.trigger) {
		    $(this)
            .children('li:has(ul)')
		        .find(options.trigger)
			    .unbind()
			    .bind('click', function(){
				    $(this).parents('li:first').toggleClass("off").toggleClass("on");
					return false;
			    });
		    } else {
		        $(this)
		            .children('li:has(ul)')
			        .unbind()
			        .bind('click', function(){
				        $(this).toggleClass("off").toggleClass("on");
						return false;
			        });
		    }
		});		
	}
})(jQuery);
