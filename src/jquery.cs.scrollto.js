(function($){

    $.cs = $.cs || {}

    $.cs.scrollTo = {
        conf: {
            before: function(){},
            after: function(){}
        }
    };

    // Constructor
    function ScrollTo(this, conf){
        console.log('meh', this);
    // Bind Scroll event to links
        $('a[href^="/#"]').click(function(e){
            
            e.preventDefault();
            $this = $(this);

            var offset = $($this.attr('href').replace('/', '')).offset();
            $('html,body').animate({ scrollTop: offset.top, scrollLeft: offset.left });
        });
    }

    // jQuery plugin
    $.fn.csScrollTo = function(conf){
        console.log('this is workign');

        var el = this.data('csScrollTo');
        if (el) { return el; }

        conf = $.extend({}, $.cs.scrollTo.conf, conf);

        var blah = new ScrollTo(this, conf);
    }
})(jQuery);