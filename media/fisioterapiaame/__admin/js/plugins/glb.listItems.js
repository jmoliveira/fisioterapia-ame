(function($){
	
	$.fn.listItems = function(options){
		$this = $(this);
		var _super = this;
		var options = $.extend({
            hits: 10,
            value: '',
            page:0
            }, options);  
		
		return this.each(function(){

		
			function listItems(page){
				
				//calculando o offset
				var _offset = page * options.hits;
				$(".paginacao").hide();
	         	$(".resultado").hide();
	         	$this.hide();
				
				var t = $.template(options.html);
				$(".cma-text").val($(".cma-text-hidden").val());
				$.ajax({
					type:'GET',
					data:{hits: options.hits, offset: _offset, value: options.value},
					url:options.jsonUri,
					success:function(json){
						var _json = JSON.parse(json);
                        var _totalHits = _json.total_hits;
                        var _totalPages = Math.round(_totalHits/options.hits);
						
						$this.empty();
						
						$.each(_json.items, function(i, item){
							$this.append(t, item);
                        });
						if (_totalHits > 0)
						{
							$(".resultado").html("<p>Foram encontrados <strong>" + _totalHits + "</strong> resultados" + (options.value ? " para \"" + options.value + "\"" :"") + ".<br/>exibindo de <strong>" + (_offset + 1) + "</strong> a <strong>" + (_offset + _json.items.length) + "</strong> </p>");
							//paginacao
							$(".paginacao").pagination(_totalHits, {
								items_per_page: options.hits,
								num_display_entries: 3,
								num_edge_entries: 1,
								prev_text: '« anterior',
								next_text: 'próxima »',
							    callback: listItems,
							    current_page: page
	         			  	});
	         			  	$this.show();
	         			  	$(".paginacao").show();
	         			  	$(".resultado").show();
	         			 }else{
	         			 	this.error();
	         			 } 	

					},
					error:function(){
						$this.html('<li>Não foi encontrado nenhum item correspondente.</li>');
						$this.show();
						$('.paginacao').hide();
						$(".resultado").hide();
					}
				});
			}
			
			listItems(options.page < 0 ? 0 : options.page);
			
			$('.cma-search').bind('click', function(){
			    	options.value = $('.cma-text').val();
			    	$(".cma-text-hidden").val(options.value);
			        listItems(0);
			        
			        return false;
			    });
			    
		    $('.cma-form').bind('submit', function(){
		    		options.value = $('.cma-text').val();
		    		$(".cma-text-hidden").val(options.value);
			        listItems(0,true);
			        
			        return false;
			    });		   
		});
		
	}
})(jQuery);
