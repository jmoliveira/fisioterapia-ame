($.fn.acessoRapido = function(){

	var $sections = $('.niveis', '.box-combo-acesso');
	var section =  $.cookie('section_acesso_rapido') || '#root';
	var lastSection = section;
	var timeMenu = '';
	var firstSection = true;
	var target = $('#scrollHorizontal').get(0);
	
	//$.log('init: '+section)
	
	$('#hideCombo').hide();
	$('.acesso-rapido').click(function(){
		$('#hideCombo').slideToggle(function(){
			path();
		});
	});
	
	$('.box-combo-acesso').bind('mouseleave', function(){
		timeMenu = setTimeout(function(){
			$('#hideCombo').slideUp();
		}, 3000);
	}).bind('mouseenter', function(){
		clearTimeout(timeMenu);
	});
	
	//scrollHorizontal
	resizeItem();
	initScrollHor();
	aplicaLink();
	voltarNivel();
	
	$('.btn-nivel-acima').attr('href',section);
	
	function initScrollHor(){
		
		$.localScroll({
			target: target,
			axis: 'x',
			queue: true,
			duration: 350
		});
	}
	
	
	function resizeItem(){
		var _height = (firstSection) ? $(section).height() + 32 : $(section).height();
		$('conteudo-combo').add('#scrollHorizontal').height(_height);

		firstSection = false;
	}
	
	
	
	function aplicaLink(){
		$('.goto').bind('click', function(){
			lastSection = '#'+$(this).parents('.niveis:first').attr('id');
			section = ($(this).attr('href').substr(0,1)=="#") ? $(this).attr('href') : lastSection;		
					
			$('.btn-nivel-acima').attr({
				href: lastSection
			});
			
			//$.log('session atual: '+section+' | lastSection:'+lastSection)
			$.cookie('section_acesso_rapido',section);			
			path();
		});
	}
	
	function path(){
		_sectionTemp = section.substr(1);
		_limite = $sections.length - 3;
		
		_arrSection = [];
		
		$('.txt-path').html('').hide();
		
		$sections.each(function(i, item){
			_arrSection.unshift($(this).attr('id'));
			if ($(this).attr('id') == _sectionTemp) 
				return false;
		});
		
		_arrSection = _arrSection.slice(0, 3);
		_arrSection = _arrSection.reverse();
		
		$.each(_arrSection, function(i, item){
			if (i == 0) {
				$('.txt-path').append('<a href="#' + item + '" class="goto">..</a> / ');
			}
			else 
				if (i == _arrSection.length - 1) {
					$('.txt-path').append(item);
				}
				else {
					$('.txt-path').append('<a href="#' + item + '" class="goto">' + item + '</a> / ');
				}
			
		}); 
		
		$('.txt-path').fadeIn();
		initScrollHor();
		resizeItem();
		
		$('.goto', '.txt-path').bind('click', function(){
			section = $(this).attr('href');
			$('.btn-nivel-acima').attr({
				href: section
			});
			
			$.cookie('section_acesso_rapido',section);
			path();
		});
	}
	
	function voltarNivel(){
	
		$('.btn-nivel-acima').click(function(){
			
			$this = $(this);
			_sectionTemp = section.substr(1);
			
			$sections.each(function(i){
				if ($(this).attr('id') == _sectionTemp && i != 0) {
					$this.attr('href', '#' + $sections.eq(i - 1).attr('id'));
					section = '#' + $sections.eq(i - 1).attr('id');
				}
			});
			
			$.cookie('section_acesso_rapido',section);
			
			path();
		});
		
	}
	
	// scrollVertical
	$('#scrollVertical').jScrollPane();
	
	$('.btn-scroll').bind('click', function(){
		$('#scrollVertical')[0].scrollBy(parseInt($(this).attr('rel')));
		
		return false;
	});
	
})(jQuery);

