jQuery.fn.csScrollTo = function(){

    // Bind Scroll event to links
    $('a[href^="/#"]').click(function(e){
        e.preventDefault();
        $this = $(this);
        var offset = $($this.attr('href').replace('/', '')).offset();

        $('html,body').animate({ scrollTop: offset.top, scrollLeft: offset.left });
    });
}

(function($){

    $.cs = $.cs || {}

    $.cs.scrollTo = {
        conf: {
            before: function(){},
            after: function(){}
        }
    };

    // Constructor
    function ScrollTo(){

    }


    // jQuery plugin
    $.fn.csScrollTo = function(conf){

        var el = this.data('csScrollTo');
        if (el) { return el; }

        conf = $.extend({}, $.cs.scrollTo.conf, conf);
        
    }





})(jQuery);