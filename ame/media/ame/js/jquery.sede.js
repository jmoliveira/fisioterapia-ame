$(document).ready(function () {

	function hideItems() {
		$(".tipo_arena").hide();
		$(".capacidade_maxima").hide();
		$(".maior_publico").hide();
		$(".evento_inauguracao").hide();
		$(".historico").hide();
		$(".area_construida").hide();
		$(".dimensoes").hide();
	}

	function showItems() {
		$(".tipo_arena").show();
	    $(".capacidade_maxima").show();
		$(".maior_publico").show();
		$(".evento_inauguracao").show();
		$(".historico").show();
		$(".area_construida").show();
		$(".dimensoes").show();
	}

	hideItems();
	
	$("#id_tipo option[value='1']").bind("click", function(){
		showItems();
	});

	if ($("#id_tipo option[value='1']:selected").length != 0) {
		$("#id_tipo option[value='1']:selected").trigger('click');
	}

	$("#id_tipo option[value!='1']").bind("click", function(){
		hideItems();
	});

	
});