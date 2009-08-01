($.fn.acessoRapido = function(){
	
	$('#hideCombo').hide();
	$('.acesso-rapido').click(function(){
		$('#hideCombo').slideToggle(function(){
		});
	});
	
	var target = $('#scrollHorizontal').get(0);
	var $last = $([]);//save the last link
	
	$.localScroll.hash({
		target: target,
		axis:'x',
		queue:true,
		duration:350
	});

	$.localScroll({
		target: target,
		axis: 'x',
		queue: true,
		duration: 350,
		hash:true,
		onBefore:function( e, anchor, $target ){//'this' is the clicked link
			$last.removeClass('scrolling');
			$last = $(this).addClass('scrolling');
		},
		onAfter:function( anchor ){
			$last.removeClass('scrolling');
			$('')
			$('.btn-nivel-acima').attr('href','#'+$last.parents('.niveis:first').attr('id'));
		}

	});
		
})(jQuery);