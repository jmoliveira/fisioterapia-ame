(function($){
    $.fn.structure_tooltip = function (options) {
      var $self = this;
      var settings = $.extend({
          items: [{id: "id-example", name: "Example", on_click: function(source){}}],
      }, options);

      var childs = [];
      $.each(settings.items, function (key) {
          childs.push($.create('span', {id: this.id}, [$.create('a', {href: '#'}, this.name)]));
          var self = this;
          $("#" + this.id).live('click', function (){ self.on_click($self)});
      });

      var template = $.create('div', {class: "tooltip", id: $self.attr("id") + "-tooltip"}, childs);
      $self.qtip({
          content: template.html(),
          solo: true,
          hide: { fixed:true },
          position: {
             corner: {
                target: 'rightMiddle',
                tooltip: 'leftMiddle'
             }
          },
          style: {
             name: 'light',
             padding: '7px 13px',
             width: {
                max: 210,
                min: 0
             },
             tip: true
          }
       });
    }
})(jQuery);