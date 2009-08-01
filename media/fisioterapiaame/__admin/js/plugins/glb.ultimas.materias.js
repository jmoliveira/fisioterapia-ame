(function($){

	$.fn.ultimasMaterias = function(options, isAnUserSearch){
		var $this = $(this);
		var _super = this;
		var _dragging = false;
		var _interval;
		var options = $.extend({
			json_uri: '/admin/estrutura/fastsearch/',
            hits: 10,
            value: '',
            editoria:'',
            refresh: 180000
			}, options);  
        
        $("body").append( $("<div id='cma-drag-noticias'></div>") );
        
		$("a#btn-ultimas-materias,a#btn-close-ultimas-materias")
		    .unbind(".ultimas_materias")
		    .bind('click.ultimas_materias',function(){
    		    if (_interval) { clearInterval(_interval); 	}
				var $container = $("div#cma-ultimas-materias-container");
				if ($container.css("display") == "none"){
					$container.show();
					$(this).addClass("on");
				}
				else{
				    $container.hide();
				    $("a#btn-ultimas-materias").removeClass("on");
					
				}
				return false; 
		    });
			
		$("div#cma-ultimas-materias-container")
			.unbind(".ultimas_materias")
			.bind('mouseleave.ultimas_materias',function(){
				$container = $(this);
				
				if(_dragging){
					_interval = setInterval(function(){ 
						$container.hide();
						_dragging = false;
						$("a#btn-ultimas-materias").removeClass("on");
					},3000);
				}
				
			})
			.bind('mouseenter.ultimas_materias',function(){
				
				if (_interval) { clearInterval(_interval); 	}
			});

		return this.each(function(){
			
			
			$.ajax({
				type:'GET',
				url: '/media/xml/sessoes_ge.xml',
	  		    dataType: "xml",  	
	  		    contentType: "application/xml; charset=utf-8",
	  		    success: function(xml) {
					 $(xml).find("row").each(function(){
						 var display_sessao = $(this).find("DISPLAY_LABEL_TXT").text();  
						 var label_sessao = $(this).find("SESSION_LABEL_TXT").text();  
						 $('#editorias').append('<option value="'+display_sessao+'">'+label_sessao+'</option>');
					 });		  			
				},

                error: function(r){
                    $('#cma-doc').showMessage({response: r});
                }
				
			});


			loadMaterias = function(page, isUserSearch){
				
				//calculando o offset
				var _offset = page * options.hits;
				
				
				if (_super.interval){
 			  		clearInterval(_super.interval);
 			  	}
				
				$.ajax({
					type:'GET',
					data:{hits: options.hits, offset: _offset, value: options.value, editoria: options.editoria},
					url:options.json_uri,
					success:function(json){
						var _json = JSON.parse(json);
						var _days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
						var _minutes = '';
						var _hours = '';
						var _date = '';
                        var _totalHits = _json.total_hits;
                        var _hits = _json.hits;  
                        var _totalPages = Math.round(_totalHits/_hits);
                        
                        $('ol', $this).empty();
                        $('ol', $this).removeClass("noresult");
						$.each(_json.news, function(i, item){
							
							var dtPrimeiraPub = item.dataatualizacao;
							var editoria = item.subeditorias ? item.subeditorias.split("fastpbfast") : "";
							editoria = editoria[0];
							var n = dtPrimeiraPub.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/)
							var newDtPub = new Date(n[1], n[2]-1, n[3], n[4], n[5], n[6]);
							
                            //Acerta o timezone
							_minutes = newDtPub.getMinutes();
							_hours = newDtPub.getHours();
							
							if(_minutes<10){_minutes = "0" + _minutes;}
							if(_hours<10){_hours = "0" + _hours;}
							
																
							if(_date != newDtPub.getDate() || _date == '') {
								var _item = '<li class="dia-plantao">'+ _days[newDtPub.getDay()] +', '+ newDtPub.getDate() +'/'+ Number(newDtPub.getMonth()+1) +'/'+ newDtPub.getFullYear() + '</li>';
								$('ol', $this).append(_item); 
							}
                               
						    var _item = '<li class="cma-highlight-drag">'
				            _item += '<p class="hora">'+ _hours + "h" + _minutes 
				            
				            if (options.editoria == '') {
				                  _item += ' <span> | '+editoria +'</span>'
				            }      
				            
				            _item += '</p><h3>'
					        _item += '<a href="' + item.url + '">'+ item.title +'</a>'
						    _item += '</h3>'
						    _item += '</li>'
							
							$('ol', $this).append(_item);
							
							_date = newDtPub.getDate();
                        });
                        
                                              
                        var $cmaDragNews = $("#cma-drag-noticias");
                        $cmaDragNews.width( 0 );
                        $cmaDragNews.height( 0 );
                        $cmaDragNews.css({'position':'absolute','overflow':'hidden','top':0,'left':0});                          

                        var _x = 0;
                        var _y = 0;
                        var $noticia = $(".cma-highlight-drag", _super);
                        $noticia.draggable("destroy");
                        $noticia.draggable({
 							helper:'clone',
 							appendTo:'#cma-drag-noticias',
							
							cursorAt: { left:115 , top: 30 },
							
                            start: function(event, ui) {
                                $.closeToolTip({target:$('.cma-highlight'), tooltip: $('.menu-cma-chamada-edit')}); 
                                
                                $cmaDragNews.attr('className', 'cma-ultimas-materias');
                                $cmaDragNews.width( $(document).width() );
                                $cmaDragNews.height( $(document).height() );
                                
								ui.helper.css('background-color','#FFF');
								ui.helper.css('opacity','0.8');
								ui.helper.width( $(this).width() );
								ui.helper.height( $(this).height() );
								
                                _dragging = true;
                            },

                            stop: function() {
                                //$.container.highlight.tooltip();
                                $cmaDragNews.attr('className', '' );
                                $cmaDragNews.width( 0 );
                                $cmaDragNews.height( 0 );
                                $cmaDragNews.empty();
                            }
                        });

						//paginacao
						$(".paginacao").pagination(_totalHits, {
							items_per_page: 10,
							num_display_entries: 3,
							num_edge_entries: 1,
							prev_text: '« anterior',
							next_text: 'próxima »',
						    callback: loadMaterias,
						    current_page: page
         			  	});

         			  	//Define o tempo de atualizacao do box das materias
						_super.interval = setInterval(loadMaterias, options.refresh,page,false);
					},
					error:function(){
					    if(isUserSearch){
						    $('ol', $this).html('<li>Não foi encontrado nenhuma matéria correspondente.</li>');					    
						    $('ol', $this).addClass("noresult");
						    $('.paginacao').hide();

						}
					}
				});
			}
			
			loadMaterias(0,false);
			
			$('.cma-search-article', $this)
			    .bind('click', function(){
			        options.value = $('.cma-text-article', $this).val();
			        loadMaterias(0,true);
			        $('.paginacao').show();
			        
			        return false;
			    });
			    
		    $('.cma-form-article', $this)
			    .bind('submit', function(){
			        options.value = $('.cma-text-article', $this).val();
			        loadMaterias(0,true);
			        $('.paginacao').show();
			        
			        return false;
			    });		    
			    
			 $('.cma-text-article', $this)
			    .focus(function(){
			    	if ($(this).val() == 'buscar matérias') {
			        	$(this).val('');
			    	}
			    });
			 
			 
			 $("#editorias", $this)
			    .bind('change.ultimas_materias keydown.ultimas_materias',function(){	    	  
			    	  $('.paginacao').show();
		    		  $('.cma-text-article', $this).val('');
		    		  options.value = '';
		    		  options.editoria = $("select option:selected", $this).val();
		    		  loadMaterias(0,true);
			    });			 

			 $('#cma-search-box').hide();			 
			 $('#cma-search-box-active', $this)
				 .bind('click', function() {
				     $('div.cma-ultimas-materias').toggleClass("search");
					 $('#cma-search-box').toggle();
					 $('.cma-text-article').focus();				     
				     return false;
				 });

		
		});
		
	}


})(jQuery);
