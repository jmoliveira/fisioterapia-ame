/* AutoSuggest */
(function($){
            
	$.fn.suggest = function(options){
		
		var options = $.extend({}, options);
		
		var container = "#SuggestContainer ul";
		
		$("body").append('<div id="SuggestContainer"><ul></ul></div>');
		$(container).hide();
		var selected_class = "suggest_hover";
		var selected = ".suggest_hover";
		var text_box = $(this);
		var text_val;
		
		var _callback = options.callback;
		var items = options.items;
		
		
		$(this).bind("keyup click", function(e){
		
		    text_val = $(this).val();
		    
		    if ($.trim(text_val)!="") {

                var offSet = $(this).offset();
                var pattern = new RegExp(text_val, ["gi"]);
                
       			var _visible = !($(container).css('display')=='none');
            
        			$(container).css({
        				position: "absolute",
        				top: offSet.top + $(this).outerHeight() + "px",
        				left: offSet.left,
        				width: $(this).outerWidth()-2 + "px",
        				opacity: 1.0,
        				zIndex: 20000
        			}).show();
        			
		    
        			// keyCode 27 == esc and keycode 9 == tab
        			if (e.keyCode == 27)  {
        			    $(container).hide();
        			}
			
        			// if enter key
        			else if (e.keyCode == 13) {
        				if ($(selected).length == 1) {
        					$(this).val($(selected).text());
        				}        			    
        				$(container).hide();        				
        			}
			
              //if down arrow        			
              else if ((e.keyCode == 40) && (_visible))  {
        			    
        				// if any suggestion is highlighted        				
        				if ($(selected).length==1){
        					if (!$(selected).next().length == 0) {
        						$(selected).next().addClass(selected_class);
        						$(".suggest_hover:eq(0)").removeClass(selected_class);
        					}
        				} else {
        					$("#SuggestContainer ul li:first-child").addClass(selected_class);
        				}        			}
			
        			// if up arrow
        			else if ((e.keyCode == 38) && (_visible)) {
        				// if any suggestion is highlighted        				
        				if ($(selected).length == 1) {
        					if (!$(selected).prev().length == 0) {
        						$(selected).prev().addClass(selected_class);
        						$(".suggest_hover:eq(1)").removeClass(selected_class);
        					}
        					// if is first child
        					else {
        						$(selected).removeClass(selected_class);
        					}
        				}
        			}
				
				else {
				
                    $(container).empty();

                    $.each(items, function(){
                    
                        var suggest_text = this.text;
                    
                        if (pattern.exec(suggest_text)) {
                            suggest_text = suggest_text.replace(pattern, "<b>" + text_val + "</b>");
                            $(container).append("<li id=" + this.value + ">" + suggest_text + "</li>");
                        }
                    
            				$("#SuggestContainer ul li").bind("mouseover", function(){            						$(selected).removeClass(selected_class);
            						$(this).addClass(selected_class);
            						text_box.val($(this).text());
            				});                        
            				$("#SuggestContainer ul li").click(function(){
            					$(this).addClass(selected_class);
            				});        			
    				    
                    });
                }
                
			} else {
			    $(selected).removeClass(selected_class);
				$(container).hide();
			}
				            
            return false;
		});
	    
	    $(this).bind("blur", function(){
	        
	        var _text = $(this).val();
	        var _input = $(this);
	        var clean = true;
	        	                	        
	        if (_text.charAt(0) != '/')
	            _text = '/' + _text;       
	        
	        $.each(items, function(){
	            if (this.text.toUpperCase() == _text.toUpperCase()) {
	                clean = false;
	                
	                _input.val(this.text);
	                
	                if ($(selected).length==0) {
	                    $("#"+this.value).addClass(selected_class);
	                }

	            }	            
	        });
	        
	        if (clean) {
	            $(this).val('');
	        }
	    
	        if ($(this).val() != "") {
	            _callback($(selected).attr('id'));
	        }
	        
   	        $(container).empty();
	        
	    });
	    
		$(document).bind("click", function(){
			$(container).hide();
		});
	};

})(jQuery);
/*Fim do AutoSuggest */
