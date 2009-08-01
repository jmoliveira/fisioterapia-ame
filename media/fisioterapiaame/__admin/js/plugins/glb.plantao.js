(function($){
	
	$.fn.plantao = function(options){
		$this = $(this);
		
		var options = $.extend({
			json_uri: '/plantao/',
            target:'Editoria/Noticias',
			refresh:180000
			}, options);  
		
		return this.each(function(){
			
			function loadPlantao(){
				$.ajax({
					type:'GET',
					data:{rows: 5},
					url:options.json_uri,
					success:function(json){
						
						var _json = JSON.parse(json);
						var _item = '';
						var _days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
						var _minutes = '';
						var _hours = '';
						var _date = '';		

						$.each(_json.response.docs, function(i, item){
							
							var dtPrimeiraPub = item.dataPrimeiraPublicacao;
							var n = dtPrimeiraPub.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/)
							
							var newDtPub = new Date(n[1], n[2]-1, n[3], n[4], n[5], n[6]);
							
                            //Acerta o timezone
							newDtPub.setMinutes(newDtPub.getMinutes() - newDtPub.getTimezoneOffset());
							_minutes = newDtPub.getMinutes();
							_hours = newDtPub.getHours();
							
							if(_minutes<10)_minutes = "0" + _minutes;
							if(_hours<10)_hours = "0" + _hours;
																	
							if(_date != newDtPub.getDate() || _date == '') _item += '<li class="dia-plantao">'+ _days[newDtPub.getDay()] +', '+ newDtPub.getDate() +'/'+ Number(newDtPub.getMonth()+1) +'/'+ newDtPub.getFullYear() + '</li>'      	
							_item += '<li>'
					        _item +=	'<p class="hora">'+ _hours + "h" + _minutes +' <span> | Mundo</span></p>'
						    _item +=    '<h3>'
						    _item +=          '<a href="' + options.target + '/' + item.id + '.html">'+ item.titulo +'</a>'
							_item +=	'</h3>'
							_item += '</li>'
							
							_date = newDtPub.getDate();
						});
						
						$('ol', $this).html(_item);		 
					},
					error:function(){
						$('ol', $this).html('<li>Não foi possível carregar o plantão.</li>');	
					}
				});
			}
			loadPlantao();
			
            //Define o tempo de atualizacao do box de plantao
			var interval = setInterval(loadPlantao, options.refresh);
		
		});
		
	}
	
})(jQuery);
