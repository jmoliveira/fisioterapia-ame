(function($){
	$.fn.editInPlace = function(options, fn){
	    var options = jQuery.extend({
			inputType: 'input',
			inheritClass: false,
			extraClass: ''
	    }, options);
		
	    return this.each(function(i, item){    
	    
        var elemContent = $(this).html();
        var extraParamsObj = $(this).metadata({type: 'attr',  name: 'extras'});  
        var extraParamsStr = '';             

        $.each(extraParamsObj,function(i, item){
            extraParamsStr += i + '=' + item + ' ';               
        });    

        /* check inherit class */
        if (options.inheritClass) var inheritClass = $(this).attr('class');
        
        /* retirar os dados em branco que quebravam o texto do título do box foto*/
        elemContent = jQuery.trim($.htmlToText(elemContent));
        
        var $input = $('<'+ options.inputType +' value="'+ elemContent +'" class="' + options.extraClass +'" '+ extraParamsStr.toLowerCase() +' />');

        /* check textarea */
        if (options.inputType == 'textarea') {
            $input = $('<'+ options.inputType +' class="' + options.extraClass + '" '+ extraParamsStr.toLowerCase() +'>'+ elemContent +'</'+ options.inputType +'>');
        }


        $elemTemp = $('<span class="'+ inheritClass +'"></span>');
        $elemTemp.append($input);
                    
        $(this).after($elemTemp);
        $(this).css({display:'none'});

        if(fn)fn(i, $input);
            
	    });
	}
})(jQuery);
