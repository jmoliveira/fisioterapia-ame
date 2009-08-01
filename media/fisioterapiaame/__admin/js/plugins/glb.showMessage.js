// Plugin para exibir box de mensagem (erro ou sucesso)
(function($){
	$.fn.showMessage = function(options){
	    var options = jQuery.extend({
			message: "Ops! Ocorreu um erro, por favor tente novamente.",
	        tipoAviso: "erro",
	        timeout: 2000
	    }, options)
	    
		if (options.response && options.tipoAviso == "erro"){
		    
            try {
                _obj = JSON.parse(options.response.responseText);
                _errors = _obj.errors.error;
                if($.typeOf(_errors)=='array') {
					options.message = _errors[0].message;
				} else {
					options.message = _errors.message;
				}
            } catch (err) {}
	    }
	    
	    return this.each(function(){
	        var _imgSrc = "/media/img/icones/ico_"
	            +((options.tipoAviso == "sucesso")?"sucesso":"erro")
	            +".png";
	
	        var _html = '<div class="box-mensagem">'
	            +'<div class="topo-mensagem"><a href="#" class="btn-fechar"><img src="/media/img/icones/ico_fechar.png" /></a></div>'
	            +'<div class="conteudo-mensagem">'
	           
	            +'<img src="' + _imgSrc + '" alt="' + options.tipoAviso + '" /> '
	            +'<strong>'+options.message
	            
	            +'</strong>'
              
	            +'</div>'
	            +'</div>';
	        $(_html).appendTo($(this));
		
		
			var _posIni = $(window).scrollTop();
						
			$('strong', $('.box-mensagem'))
				.html(options.message)
				.end()
				.fadeIn("slow");
				
			
			$('.box-mensagem').fadeIn("slow");
	
	        $('.btn-fechar').click(function(){
	            $('.box-mensagem').fadeOut("slow", function(){
					$('.box-mensagem').remove();
				});
				return false;
	        });
			
            //a mensagem some apos o timeout
            setTimeout(function() {
                $('.box-mensagem').fadeOut("slow", function(){
                    $('.box-mensagem').remove();
                });
            }, options.timeout);
	
	        return this;
	    });
	}
})(jQuery);
