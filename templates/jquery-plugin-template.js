/*
* Copyright 2013 Christopher Slater (chris-slater.com) and other contributors
* Released under the MIT license
* See the file MIT-LICENSE.txt for copying permission. The license can also be found at: http://opensource.org/licenses/MIT
*/
(function($){

    $.cs = $.cs || {}

    $.cs.scrollTo = {
        conf: {
            before: function(){},
            after: function(){}
        }
    };

    // Constructor
    function ScrollTo(root, conf){

        /* ==========================================================
            VARIABLES
        ========================================================== */

        /* ==========================================================
            INITIALISATION
        ========================================================== */

        conf.before();

        var init = function (){

        }();

        conf.after();

        /* ==========================================================
            GETTERS AND SETTERS
        ========================================================== */

        // Getters
        
        // Setters

        /* ==========================================================
            EVENTS
        ========================================================== */


        /* ==========================================================
            EXTRA FUNCTIONS
        ========================================================== */

        
        /* ==========================================================
            API
        ========================================================== */

        root.data('csScrollTo', {
        });
    }

    // jQuery plugin
    $.fn.csScrollTo = function(conf){

        var el = this.data('csScrollTo');
        if (el) { return el; }

        conf = $.extend({}, $.cs.scrollTo.conf, conf);

        var instance = new ScrollTo(this, conf);

        return this;
    }
})(jQuery);