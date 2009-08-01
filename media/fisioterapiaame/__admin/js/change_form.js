$(document).ready(function(){

    $("input[type=text]").keydown(function(event){
        if (event.keyCode == 13) {
            return false;
        }
    });


    $(".required").append(" <img src=\"/media/img/exclain.png\"/>");

});    

