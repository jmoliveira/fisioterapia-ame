$.glb = {
    module: function() {
        var object = null, arrObjects = [];
                
        $.each(arguments, function(i, arg){           
            object = $;
            var objI = arg.split(".");
            
            if(objI[0]=='$') { objI = objI.slice(1); }
                
            $.each(objI, function(j, o){               
                object[o] = object[o] || {};
                object = object[o];
            });
            
	        arrObjects.push(object);
        });
        
        return (arrObjects.length>1) ? arrObjects : object;
    }
}

$.glb.utils = {
	log: function(msg){
			if ( window.console && console.log ) console.log(msg)
				//else alert("> "+ msg);
			return this;
    },
	/* diz o tipo do objeto value passado por parametro. */
	typeOf: function(value){
	    var s = typeof value;
	    if (s === 'object') {
	        if (value) {
	            if (typeof value.length === 'number' &&
	                    !(value.propertyIsEnumerable('length')) &&
	                    typeof value.splice === 'function') {
	                s = 'array';
	            }
	        } else {
	            s = 'null';
	        }
	    }
	    return s;
	},
	/* diz o indice do objeto value em um array. */
	indexof: function(array,value){
	    for(i=0; i < array.length; i++){
	        if(array[i] == value){
	            return i;
	        }
	    }

	    return -1;
	},	
	htmlToText: function(value){
	    return value.replace(/\&amp;/g,"&").replace(/\&lt;/g,"<").replace(/&gt;/g,">").replace(/<br>/g,"\n").replace(/<br\/>/g,"\n").replace(/<br \/>/g,"\n").replace(/\&nbsp;/g, " ");
	},
	textToHtml: function(value) {
		return value.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br />").replace(/  /g, "&nbsp; ");
    }
};
