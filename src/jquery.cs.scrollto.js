/*
* Copyright 2013 Christopher Slater (chris-slater.com) and other contributors
* Released under the MIT license
* See the file MIT-LICENSE.txt for copying permission. The license can also be found at: http://opensource.org/licenses/MIT
*/
(function($){

    $.cs = $.cs || {}

    $.cs.scrollTo = {
        conf: {
            selector: 'a[href^="#/"]',
            before: function(){},
            after: function(){}
        }
    };

    // Constructor
    function ScrollTo(root, conf){
        // Bind Scroll event to links

        $(conf.selector).click(function(e){
            
            e.preventDefault();
            var $this = $(this);
            
            var offset = $($this.attr('href').replace('/', '')).offset();
            
            if (offset) {
                $('html,body').animate({ scrollTop: offset.top, scrollLeft: offset.left });
            }
        });
    }

    // jQuery plugin
    $.fn.csScrollTo = function(conf){

        var el = this.data('csScrollTo');
        if (el) { return el; }

        conf = $.extend({}, $.cs.scrollTo.conf, conf);

        var instance = new ScrollTo(this, conf);
    }
})(jQuery);