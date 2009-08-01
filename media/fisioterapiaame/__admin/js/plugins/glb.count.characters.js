/* Count Characters */
(function($){
	$.fn.countCharacters = function(fn){
		return this.each(function(){
			var $input = $(this);
			var maxlength = $input[0].getAttribute("maxlength");
			if (fn != undefined) { fn($input, $.trim($input.val()).length); }
			$input.bind('click keyup', function(){
	            if (maxlength!= undefined){
					if ($.trim($input.val()).length >= Number(maxlength) && maxlength!='') {
					    $input.val($.trim($input.val()).substring(0, Number(maxlength)));
					}
				}
				if (fn != undefined) { fn($input, $.trim($input.val()).length); }
			});
		});
	}
})(jQuery);
/* Count Characters */
