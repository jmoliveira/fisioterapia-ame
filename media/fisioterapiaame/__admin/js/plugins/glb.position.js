/**
 *
 * @author Luiz Adolpho (ramal 6427)
 *
 * @description classe utilitaria para pegar a posicao X e Y na pagina 
 * de qualquer elemento DOM
 */	

$.fn.x = function(n) {
    var result = null;
    this.each(function() {
        var o = this;
        if (n === undefined) {
            var x = 0;
            if (o.offsetParent) {
                while (o.offsetParent) {
                    x += o.offsetLeft;
                    o = o.offsetParent;
                }
            }
            if (result === null) {
                result = x;
            } else {
                result = Math.min(result, x);
            }
        } else {
            o.style.left = n + 'px';
        }
    });
    return result;
};

$.fn.y = function(n) {
    var result = null;
    this.each(function() {
        var o = this;
        if (n === undefined) {
            var y = 0;
            if (o.offsetParent) {
                while (o.offsetParent) {
                    y += o.offsetTop;
                    o = o.offsetParent;
                }
            }
            if (result === null) {
                result = y;
            } else {
                result = Math.min(result, y);
            }
        } else {
            o.style.top = n + 'px';
        }
    });
    return result;
};
