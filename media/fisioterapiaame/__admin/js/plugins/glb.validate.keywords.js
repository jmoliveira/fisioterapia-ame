(function($) {

    $.extend({
        validateKeywords : {
            init: function($textarea, options){
                var _self = this;
                this.$keywordsTextarea = $textarea;
                var _keywordsTextareaId = this.$keywordsTextarea.attr('id')+'_fake';
                var $textareaParent = this.$keywordsTextarea.parent();

                if($('#'+_keywordsTextareaId, $textareaParent).length != 0) {
                    $('#'+_keywordsTextareaId, $textareaParent).remove();
                }

                this.$keywordsContent = $('<div id="'+_keywordsTextareaId+'" class="'+this.$keywordsTextarea.attr('class')+'"></div>');
                this.$keywordsContent.insertAfter($textarea);

		        this.invalidKeywords = options.invalidKeywords;

		        this.$keywordsContent
			        .css({visibility:'visible',position:'static'})
			        .unbind()
			        .bind('click', function(){
                        $(this).css({visibility:'hidden',position:'absolute'});
                        _self.$keywordsTextarea.css({visibility:'visible',position:'static'});
                        _self.$keywordsTextarea.focus();
                    });

		        this.$keywordsTextarea
			        .css({visibility:'hidden',position:'absolute'})
			        .blur(function(){
				        _self.highlightKeys();
			        });
		        this.highlightKeys();
	        },
	        getInvalidKeys:function(){
		        var _self = this;
		        var _invalidKeys = [];

		        if($.typeOf(this.invalidKeywords)=='array') {
			        $.each(_self.invalidKeywords, function(i, item){
				        _invalidKeys.push($.trim(item.input));
			        });
		        } else {
			        _invalidKeys.push($.trim(_self.invalidKeywords.input));
		        }

		        return _invalidKeys;
	        },
	        highlightKeys: function(){
		        var _oldKeys = this.$keywordsTextarea.val().split(';');
		        var _newKeys = '';
		        var _invalidKeys = this.getInvalidKeys();
		        $.each(_oldKeys, function(i, item){
			        if(i==0 && $.indexof(_invalidKeys, $.trim(item)) != -1){
				        _newKeys += '<strong style="color:red">'+$.trim(item)+'</strong>';
			        } else if(i!=0 && $.indexof(_invalidKeys, $.trim(item)) != -1){
				        _newKeys += '; <strong style="color:red">'+$.trim(item)+'</strong>';
			        } else if(i==0) {
				        _newKeys += $.trim(item);
			        } else {
				        _newKeys  += '; '+$.trim(item);
			        }
		        });
		        this.$keywordsContent.html(_newKeys);
	        }
        }
    });

    $.fn.cleanKeywordContent = function(){
        $textarea = $(this);
        var keywordsTextareaId = '#'+$textarea.attr('id')+'_fake';
        $textarea.val("");
        $(keywordsTextareaId).remove();
        $textarea.css({visibility:'visible',position:'static'});
    }

    $.fn.validateKeywords = function(options){
	    $.validateKeywords.init(this, options);
    };

})(jQuery);
