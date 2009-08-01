jQuery.fn.swapClass = function(c1, c2){
      return this.each(function(){
      	var t = $(this);
      	(!t.is('.'+c1)) ? t.addClass(c1).removeClass(c2) : t.addClass(c2).removeClass(c1);
      });
}

jQuery.extend({
	log: function(msg){
			if ( window.console && console.log ) console.log(msg)
				//else alert("> "+ msg);
			return this;
		},
	popin: function(options, fn){
		var options = jQuery.extend({
	        box_popin: '.box-popin',
	        duration: 1000,
	        show: true
		}, options);
		
	    var $zoom = $('.popin-zoom');
	    $zoom.css({height: $(document).height()});
	    $zoom.show();
		
	    // Exibe imagem de loading
	    var $loading = $('.box-loading');
	    $loading.css({
	            top: $(window).height()/2 - $('.box-loading').height()/2,
	            left: $(window).width()/2 - $('.box-loading').width()/2
	        });
	    $loading.show();
	
	    // Cria o popin
	    var $popin = $(options.box_popin);
	    $popin.css({
	        top: $(window).height()/2 - $(options.box_popin).height()/2,
	        left: $(window).width()/2 - $(options.box_popin).width()/2
	    });
	    
	    if (options.show) {
	        $popin.show();
	
	        // Oculta o loading
	        $loading.hide();
	    }
	
	    if (fn != undefined) fn( $popin );
	
	    // Ao redimensionar a janela, o popin se desloca para o centro da janela
		$(window).resize(function(){
		  	$popin.animate({top:$(window).height()/2-$popin.height()/2, left:$(window).width()/2-$popin.width()/2},{duration: options.duration, easing: options.easing});
		});
	
	},
	/*
	diz o tipo do objeto value passado por parametro.
	*/
	typeOf: function(value){
	    var s = typeof value;
	    if (s === 'object') {
	        if (value) {
	            if (typeof value.length === 'number' &&
	                    !(value.propertyIsEnumerable('length')) &&
	                    typeof value.splice === 'function') {
	                s = 'array';
	            }
	        } else {
	            s = 'null';
	        }
	    }
	    return s;
	},
	/*diz o indice do objeto value em um array.*/
	indexof: function(array,value){
	    for(i=0; i < array.length; i++){
	        if(array[i] == value){
	            return i;
	        }
	    }

	    return -1;
	},	
	htmlToText: function(value){
        var regexpbr = /<br("[^"]*"|'[^']*'|[^'">])*>/gi;
        return value.replace(/\&amp;/g,"&").replace(/\&lt;/g,"<").replace(/&gt;/g,">").replace(regexpbr,"\n").replace(/\&nbsp;/g, " ");
	},
	namespace: function() {
	    var object = null, arrObjects = [];
	            
        $.each(arguments, function(i, arg){           
            object = $;
            var objI = arg.split(".");
            
            if(objI[0]=='$') { objI = objI.slice(1); }
            
            $.each(objI, function(j, o){               
                object[o] = object[o] || {};
                object = object[o];
            });
            
		    arrObjects.push(object);
        });
        
        return (arrObjects.length>1) ? arrObjects : object;
    }
});

