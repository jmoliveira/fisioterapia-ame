$(document).ready(function(){
   
    $('.toolbar-features .filters').unbind('click.filters').bind('click.filters', function(){
        $('#changelist-filter').toggle();
        $(this).toggleClass('filters-clicked');
    });
       
    $('.toolbar-features .actions-content').unbind('click.action').bind('click.action', function(){
        $('.actions').toggle();
        $(this).toggleClass('actions-content-clicked');
    });
    
    $('select[name="action"]').menuSuspenso({
        onApply: function($self, $list){
            $('div.actions').append($list, $self).find('label:first').remove().end().find('button:first').remove();            
            $('li:first', $list).remove();
        },
        onSelect: function(){
             $('div.actions').parents('form:first').submit();
        }
    });    
    
});   
