/*
* Copyright 2013 Christopher Slater (chris-slater.com) and other contributors
* Released under the MIT license
* See the file MIT-LICENSE.txt for copying permission. The license can also be found at: http://opensource.org/licenses/MIT
*/
(function($){

    $.cs = $.cs || {}

    $.cs.history = {
        conf: {
            selector: 'a',
            before: function(){},
            after: function(){}
        }
    };

    // Constructor
    function History(root, conf){
        var selection = root.find(conf.selector);

        selection.click(function(e){
            var url = $(this).attr('href');
            history.pushState(null, null, url);
        });
    }

    // jQuery plugin
    $.fn.csHistory = function(conf){

        var el = this.data('csHistory');
        if (el) { return el; }

        conf = $.extend({}, $.cs.history.conf, conf);

        var instance = new History(this, conf);

        return this;
    }
})(jQuery);