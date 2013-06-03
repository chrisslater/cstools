/*
* Copyright 2013 Christopher Slater (chris-slater.com) and other contributors
* Released under the MIT license
* See the file MIT-LICENSE.txt for copying permission. The license can also be found at: http://opensource.org/licenses/MIT
*/
(function($){

    $.cs = $.cs || {}

    $.cs.youtubeImages = {
        conf: {
            selector: ".cs-youtube",
            template: function(){
                return "<iframe width=\"560\" height=\"315\" src=\"http://www.youtube.com/embed/{{id}}\" frameborder=\"0\" allowfullscreen></iframe>";
            },
            before: function(){},
            after: function(){}
        }
    };

    // Constructor
    function YoutubeImages(root, conf){
        // Code here.

        /* ==========================================================
            VARIABLES
        ========================================================== */

        var $selector = $(conf.selector);

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
        function getId(obj) {
            return obj.data('csYoutubeId');
        }

        function getTemplate() {
            return conf.template();
        }
        
        // Setters

        /* ==========================================================
            EVENTS
        ========================================================== */

        $selector.click(function(e){
            var $t = $(e.target);
            replaceImage($t);
        });

        /* ==========================================================
            EXTRA FUNCTIONS
        ========================================================== */

        //https://developers.google.com/youtube/iframe_api_reference#Overview
        function loadYoutubeAPI(){
            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        function replaceImage(img) {
            var id = getId(img);
            var template = getTemplate();
            template = template.replace("{{id}}", id);
            img.replaceWith(template);
        }
        
        /* ==========================================================
            API
        ========================================================== */

        root.data('csYoutubeImages', {
        });

    }

    // jQuery plugin
    $.fn.csYoutubeImages = function(conf){

        var el = this.data('csYoutubeImages');
        if (el) { return el; }

        conf = $.extend({}, $.cs.youtubeImages.conf, conf);

        var instance = new YoutubeImages(this, conf);

        return this;
    }
})(jQuery);