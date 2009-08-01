//@dependencies 
	//glb.count.characters
	
/* Resize texarea */
(function($){
	$.fn.resizeTextArea = function(fn){
	    
	    $.convertTextToHTML = function(s) {
			s = s.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br />").replace(/  /g, "&nbsp; ");
			return s;
		}
		
		return this.each(function(){		
			if (!$(this).is("textarea")) { return false; }

			var $textarea = $(this);
			var textAreaClassName = $textarea.attr('class');
			var textAreaId = $textarea.attr('id');
			var $parent = $textarea.parent();

            if( $('#'+textAreaId+'_fake_content', $parent).length != 0 ) { return false; }
			
			$textarea.parent().append('<div id='+textAreaId+'_fake_content class="cma-textarea-fake-content '+textAreaClassName+'"></div>');
					
			var $fakeContent = $('.cma-textarea-fake-content', $textarea.parent());
	        // $fakeContent.height($textarea.height());
	        
		
			$textarea			    
				.countCharacters(function($input, count){				
					if (fn != undefined) { fn($input, count); }
					
					$fakeContent.html( $.convertTextToHTML($textarea.val()) );
						
					if ($fakeContent.height() != 0) {
					    $textarea.height($fakeContent.height() + 22);
					}
				})	
				//.height($fakeContent.height())
				.height($fakeContent.height() + 22)

                .focus(function () { 
                    $(this).addClass('cma-textarea-focus') 
                })
                .blur(function () {
					$(this).removeClass('cma-textarea-focus')
				});
					
            $fakeContent
				.css({ visibility:'hidden', position:'absolute', left:'-9999px', width: $textarea.width()})
				.bind('click', function(){
					$textarea.focus();
                })
				.html($.convertTextToHTML($textarea.val()));

			return this;

		});
	}
})(jQuery);
/* /Resize texarea */
