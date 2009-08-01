function login(){
    var options = {
    	 type: "post",
            beforeSubmit: function(formArray, jqForm) {
                var arrObjForms = [];
                var errClientProblem = "Os campos são de preenchimento obrigatório.";                                     
                var emailPattern = new RegExp(".+@.+\\.[a-z]+");
    		
    		        for(var i=0; i<formArray.length; i++) {
                    if ($.trim(formArray[i].value) == "") 
                        arrObjForms.push (formArray[i]);
                    else
                        $("#"+formArray[i].name).removeClass("form-erro");
                }
                

                for(var j=0; j<arrObjForms.length; j++) {$("#"+arrObjForms[j].name).addClass("form-erro");}
                
                if (arrObjForms[0]) {
                
                    $("#"+arrObjForms[0].name).focus();
                    $('#cma-doc').showMessage({tipoAviso: "erro", message: errClientProblem});  
                    return false;
                } else if (!emailPattern.test($("#username").val())) {
                    errClientProblem = "E-mail com formato inválido.";
                    $('#cma-doc').showMessage({tipoAviso: "erro", message: errClientProblem});  
                    return false;
                }

            },
            
            error: function (response) {
            
                $('#zoom').hide();
                
                $('#cma-doc').showMessage({
                    tipoAviso: "erro",
                    message: "E-mail ou senha incorretos."
                });                		
                                
            },
            success: function (response) {	
                window.location.href = '/';
            }
    };


    $('.btn-login').bind('click', function(){
        $('#cmaFormLogin').ajaxSubmit( options );            		
    		return false;
    });

}            
