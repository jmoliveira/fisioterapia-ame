/** 
 * @fileoverview Arquivo JS com todas as funcoes de manipulacao do favorito, como:  
 *  
 * @author Time de Jornalismo 1
 * @version 1.0 beta
 *
 * @requires jquery.cookie.js
 * @requires jquery.ui.min.js
 * @requires jquery.template.js
 * @requires glb.tooltip.js
 * @requires glb.popin.js
 **/

(function($){
	  
	$.fn.favorite = function() {
		
		create = function(data){ 
			menuSetCookie();
			renderFavoriteMenu(JSON.parse(data));
			menuGetCookie();
			tooltipFavorites();
			popinFavorites();
		};
		
		rest_urls = {
				POST:'favorites/add',
				GET:'favorites/',
				DELETE:'favorites/remove/'
			  }
		
	  	/**
	  	* Recupera lista de urls adicionadas pelo usuário
	  	* @param {JSon Array} paramName URL do Favorite a recuperar
	  	*/
		RetrieveFavorite = function(){
	  		
			var url_resource = rest_urls['GET'];
			var url = window.location.href;
			/*
			 * Comentario para desabilitar o favorito
			$.ajax({
				type: 'GET',
				url: url_resource,		
				success: function(_data) {
					create(_data);					
					verifyFavorite(JSON.parse(_data));
				},
				error : function(error) {
					showErrorMessage(error);
					
				}
			});	
			*/
	  	}
		
		/**
	  	* Adiciona favorito sugerido pelo usuario
	  	* @param {JSon Array} paramName URL do Favorite a adicionar
	  	*/
		

		
		addFavorite = function() {
			
			var url = window.location.href;
			var urlLenghth = url.length-1;
			
			//Remove # da ultima posicao para influenciar no favorito da url
			if (url.lastIndexOf('#') == (urlLenghth)){
				url = url.substr(0,urlLenghth);
			}
			
		    var $popinFavorites = $('.cma-menu-favorites-add');
			
		      
			//post para o python
            var json = "{ favorite: {'url': '" + url + "', 'name': '" + $('.cma-node-name').attr('value') + "' } }";
			var url_resource = rest_urls['POST'];
			
			$.ajax({
                type: 'POST',
                url: url_resource,
                data: json,
                success: function(msg){
                    $.closePopin( $popinFavorites );
                    RetrieveFavorite();
                    $("#cma-doc").showMessage({tipoAviso: "sucesso" ,message: "Favorito incluído com sucesso."});
                },
                error: function(error){
                	showErrorMessage(error);
                }

			});
		}	
		
		showErrorMessage = function(errorObject){
			var $errorMessage = JSON.parse(errorObject.responseText).errors.error.message;
			$("#cma-doc").showMessage({message: $errorMessage});
		}
		
		/**
	  	* Remover favorito selecionado pelo usuario
	  	* @param {JSon Array} paramName URL do Favorite a remover
	  	*/
		removeFavorite = function(idFavorite){
			
			var url_resource = rest_urls['DELETE'];
			url_resource += idFavorite;
						
			$.ajax({
				type: 'GET',
				url: url_resource,		
				success: function(_data) {
					RetrieveFavorite();
					$("#cma-doc").showMessage({tipoAviso: "sucesso" ,message: "Favorito excluído com sucesso."});
				},
				error : function(error) {
					showErrorMessage(error);
					
				}
			});	
	  	}
	  	
		// Verifica se a url existe e excluir se a estrela for clicada
		verifyFavorite = function(data){
					
			var url = window.location.href;
			var urlLenghth = url.length-1;
			
			//remove # da ultima posicao para influenciar no favorito da url
			if (url.lastIndexOf('#') == (urlLenghth)){
				url = url.substr(0,urlLenghth);
			}
			
			$(".estrela a",element).html('<img src="/media/img/icones/ico_estrela_vazia.gif" alt="Adicionar favorito" width="16" height="16" />')
			$.each(data.favorites, function (i, item){				
				if (item.url == url ) {						
					$(".estrela",element).html('<a href="#" title="Já é favorito" class="excluir"><img src="/media/img/icones/ico_estrela_cheia.gif" alt="Ja é favorito" width="16" height="16" /></a>')
					$(".estrela .excluir",element).click(function(){						
						removeFavorite(item.id);							
					})
				} 			
			});	
			
	  	}	
				
		// Array Json
		var element = $(this);		  
		
		// Funcionalidade de clique no icone de ocultar/exibir + cookie
		menuSetCookie = function() {

			// menu primario
			$(".exibir-ocultar-primario", element).unbind("click");
			$(".exibir-ocultar-primario", element).click(function () {
		
				element.find(".primario").slideToggle("slow", function () {
					var estaOculto = $(this).is(":hidden");
					var estadoDoCookie;
					var textoDoLink;
					
					if(estaOculto){
						estadoDoCookie = 'fechado';
						textoDoLink = '<img src="/media/img/icones/ico_exibir.gif" width="93" height="18" alt="Exibir" />';
						element.find(".secundario").hide();
					}else{
						estadoDoCookie = 'aberto';
						textoDoLink = '<img src="/media/img/icones/ico_ocultar.gif" width="93" height="19" alt="Ocultar" />';
					}

					// TODO:
					// seria interessante criar um propriedade domain, 
					// que permitisse o cookie ser criado em dominio diferente no ambiente de desenvolvimento
  					$.cookie("favoritos", estadoDoCookie, { expires: 365, path: '/' });
					element.find(".exibir-ocultar-primario a").html(textoDoLink);
				});
		
			});
		
			// menu secundario
			element.find(".exibir-ocultar-secundario a").unbind("click");
			element.find(".exibir-ocultar-secundario a").click(function () {		
			  
				element.find(".secundario").slideToggle("slow", function () {			
					var estaOculto = $(this).is(":hidden");
					element.find(".exibir-ocultar-primario").toggle();
				});
			
			});
			
		};
				
		// Template dos itens Favoritos (utiliza plugin)
		renderFavoriteMenu = function(data){						
			
			$(".menu-favoritos-primario li, .menu-favoritos-secundario li", element).remove();
			// adiciona itens ao menu primario
			var templateItemDeFavorito = $.template('<li id="${id}"><span><a href="${url}" title="${name}">${name}</a></span></li>');
			var ultimoItemDoMenuPrincipal = 0;
			var larguraMaximaDoFavoritos = 920; 	// Pega a largura do box
			var larguraPrincipal = 0;			
			
			$.each(data.favorites, function (i, item){
				element.find(".menu-favoritos-primario").append( templateItemDeFavorito , item);
				larguraPrincipal = obtemLarguraDoPrincipal();
				
				if(larguraMaximaDoFavoritos < larguraPrincipal ) {
					$($(".menu-favoritos-primario li",element).children()[$(".menu-favoritos-primario li",element).children().length - 1]).remove(); 														
					return false;
				}
				ultimoItemDoMenuPrincipal = i;
			});
			
			// adiciona itens ao menu secundario
			$.each(data.favorites, function (i, item){
				if( i > ultimoItemDoMenuPrincipal ){				
					$(".menu-favoritos-secundario",element).append( templateItemDeFavorito , item);			
				}
			});
			
			// verifica se o menu secundario tem conteudo e oculta o botao que exibe
			var existeMenuSecundario = $(".menu-favoritos-secundario li",element).html();			
			if (existeMenuSecundario != null){				
				$(".exibir-ocultar-secundario",element).removeClass('off');				
			}else{
				$(".exibir-ocultar-secundario",element).addClass('off');	
				$(".secundario",element).removeAttr('style');
			}
		};
				
		// calculo para inclusao do numero de itens no menu primario
		obtemLarguraDoPrincipal = function() {		
			var largura = 0;
			$.each($(".menu-favoritos-primario li",element), function (i, item){
				largura += $(item).width();
			})		
			return largura;				
		};
		
		// seta o estado do menu através do cookie
		menuGetCookie = function() {			
			var apareceFavorito = $.cookie("favoritos");			
			if(apareceFavorito == "aberto" || apareceFavorito == null) {
				element.find(".exibir-ocultar-primario a").html('<img src="/media/img/icones/ico_ocultar.gif" width="93" height="19" alt="Ocultar" />');
			} else if (apareceFavorito == "fechado"){
				element.find(".primario").hide();
				element.find(".exibir-ocultar-primario a").html('<img src="/media/img/icones/ico_exibir.gif" width="93" height="18" alt="Exibir" />');
			}		
		};
				
		// Aplicação do tooltip para exclusão do favorito
		tooltipFavorites = function() {
			$liFavorites = $(".menu-favoritos-primario li, .menu-favoritos-secundario li",element);
			$liFavorites.toolTip({
				trigger: 'mouseover',
				target: '.tooltip-favoritos', //Referencia para o tooltip especifico
				timeout: 0,
				timein: 1000,
				posX: 0,
				posY: 0
			}, function(elem, tooltip){	
				$('.tooltip-favoritos').bind('mouseleave', function() {
						$liFavorites.removeClass('box-on').addClass('box-off');
			    });
			});
			
			//Seta o id do favorito na div do tooltip ex: div id="iddofavorito"
			$liFavorites.hover(function() {	
				var $idFavorite = $(this).attr("id");
				$('.tooltip-favoritos', element).attr('id',$idFavorite);
			},function() {}		
				//mouseout
			);
		}		

		popinFavorites = function() {			
			
			// excluir favorito
	    	var $popinFavoritesLink = $('.tooltip-favoritos a',element);	   								
	    	$popinFavoritesLink.unbind('click');
	    	$popinFavoritesLink.bind('click', function(){				
				
					var $popinFavorites = $('.cma-menu-favorites-delete');
					
					$popinFavorites.popin();										
	
					// fechar popin
					$('.cma-cancel-erase', $popinFavorites).unbind('click');
	                $('.cma-cancel-erase', $popinFavorites).bind('click', function(){
	                    $.closePopin( $popinFavorites );	
	                });
	                
	                // passa o id do Favorito para exclusao
	                $('.cma-confirm-erase', $popinFavorites).unbind('click');
					$('.cma-confirm-erase', $popinFavorites).bind('click', function(){                    						
						$.closePopin( $popinFavorites );
						var $idFavorite = $('.tooltip-favoritos').attr('id');
						removeFavorite($idFavorite);
	                });
									
			});
	    		    	
			// adicionar favorito
	    	var $popinFavoritesLink = $('.estrela a', element);								
	    	$popinFavoritesLink.unbind('click');
	    	$popinFavoritesLink.bind('click', function(){				
	
	    		    $('.cma-menu-favorites-add .cma-node-name').attr('value', ''); // acertar a referencia
                 
	    			//var eventLink = ($(this).attr('class'));				
	    		    var $popinFavorites = $('.cma-menu-favorites-add');
					
					$popinFavorites.popin();
					$('.cma-node-name',$popinFavorites).focus();										
	
					// salvar 
					$('.cma-save-popin', $popinFavorites).unbind('click');
                    $('.cma-save-popin', $popinFavorites).bind('click', function(){
                        if($('.cma-menu-favorites-add .cma-node-name').attr('value') == ""){
                        	$("#cma-doc").showMessage({message: "O nome do favorito é obrigatório."});
                                return;
                        }
                        addFavorite();
                    });
                    
                    // cancelar
                    $('.cma-cancel-popin', $popinFavorites).unbind('click');
                    $('.cma-cancel-popin', $popinFavorites).bind('click', function(){                   
                            $.closePopin( $popinFavorites );
                    });
					
			});

		}
		RetrieveFavorite();		
	}	
})(jQuery);


$(function(){
	
	$("#cma-menu-favoritos").favorite({});

});
