/*
* Copyright 2013 Christopher Slater (chris-slater.com) and other contributors
* Released under the MIT license
* See the file MIT-LICENSE.txt for copying permission. The license can also be found at: http://opensource.org/licenses/MIT
*/

$.fn.csAdaptiveImages = function(conf) {

    // Concentrate on size for Retina screens.
    // Try and implement a naviator.connection where possible.
    conf = $.extend({
            // initiate mobile width when lower than pixel width
            isMobileAt: 768,
            selector: ".image-loader"
        }, conf);

    // Define variables
    var $this = this;
    var $window = $(window);
    var images = $this.find(conf.selector);
    var dpr = window.devicePixelRatio;
    var isMobileScreenWidth = (getCurrentWindowWidth() < getMobileResponseWidth());
    var connection = null;

    init();


    function init() {

        // Find out support for device
        // supports connection.
        //connection();


        
        // Run init on each image
        images.each(function(k,v){


            // image as a jquery object.
            var img = processImageTagFromRaw(v);
            var value = dprValue();

            if (dprValue) {
                img.attr('src', img.data('src-' + value));
            } 



            img.addClass('js-ai-processed');

            // Apply image tag before the no script
            img.insertBefore($(v));

            //$(v).before(img);
        });
    }

    // Getters
    function getCurrentWindowWidth() {
        return $window.width();
    }

    function getMobileResponseWidth() {
        return conf.isMobileAt;
    }

    // Setters

    // Functions

    // function connection() {
    //     var connection = false;
    //     console.log(navigator.connection);
    //     if (navigator.connection) {
    //         console.log('android');
    //     }
    //     if (navigator.mozConnection) {
    //         console.log('moz', navigator.mozConnection);

    //     }

    // }

    function processImageTagFromRaw(v) {
        return getImageTag(parseRawHTML(v));
    }

    // Parse raw html and return as jquery object
    function parseRawHTML(rawHTML) {
        return $($.parseHTML($(rawHTML).text()));
    }

    // the parsed object will contain empty text nodes either side of the image tag. Returning the 1st index only returns just the image
    function getImageTag(parsedObject) {

        alert(parsedObject.eq(1).prop('nodeType'));

        return parsedObject.eq(1);
    }

    function dprValue () {
        switch (dpr) {
            case 2:
                return 'big';
                break;
            default:
                
        }
        return false;
    }

    this.data('adaptiveimages', {
        'run' : init
    });

    // Events

    // Return value
    return this;
}