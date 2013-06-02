/*
* Copyright 2013 Christopher Slater (chris-slater.com) and other contributors
* Released under the MIT license
* See the file MIT-LICENSE.txt for copying permission. The license can also be found at: http://opensource.org/licenses/MIT
*/
(function($){

    $.cs = $.cs || {}

    $.cs.rotator = {
        conf: {
            viewport: '.viewport',
            items: '.items',
            itemsInView: 1,
            duration: 400,
            current: 'current',
            prev: '.prev',
            next: '.next',
            pager: true,
            pagerContainer: '.pager',
            auto: true,
            interval: 4000,
            before: function(){},
            after: function(){}
        }
    };

    // Constructor
    function Rotator(root, conf){

        /* ==========================================================
            VARIABLES
        ========================================================== */

        var currentPage = 0;
        var itemsInView = conf.itemsInView;
        var $items = root.find(conf.items);
        var $prev = root.find(conf.prev);
        var $next = root.find(conf.next);
        var $pager = root.find(conf.pagerContainer);
        var auto;

        /* ==========================================================
            INITIALISATION
        ========================================================== */

        conf.before(root);

        var init = function (){
            setItemsWidth();
            if (conf.pager) {
                buildPager();
            }
            if (conf.auto) {
                setAuto();
            }
        }();

        conf.after();

        /* ==========================================================
            GETTERS AND SETTERS
        ========================================================== */


        // Getters
        function getItemsLength(){
            return $items.children().length;
        }

        function getTotalPages(booleon){
            var pages = getItemsLength() / itemsInView;
            // Round up if booleon is true;
            return (booleon)? Math.ceil(pages) : pages;
        }

        function getPrevPage(){
            var page = getCurrentPage() - 1;
            return (page < 0)? getTotalPages(true) - 1 : page;
        }

        function getNextPage(){
            var page = getCurrentPage() + 1;
            return (page > (getTotalPages(true) - 1))? 0 : page;
        }

        function getCurrentPage(){
            return currentPage;
        }

        // Setters
        function setCurrentPage(num) {
            currentPage = num;
        }

        function setItemsWidth(){
            var cal = getTotalPages() * 100;
            $items.css('width', cal + '%');
        }

        function setPage(num){
            var margin = '-' + (num * 100) + '%';

            // Add a modinizr for using css3 instead of animate
            $items.animate({'marginLeft': margin}, conf.duration);

            // update current page
            setCurrentPage(num);

            // if pager set pager
            updatePager();
        }

        function setAuto(clear){
            if (clear){
                clearInterval(auto);
            } else {
                auto = setInterval(next, conf.interval);    
            }
        }

        /* ==========================================================
            EVENTS
        ========================================================== */

        $prev.click(function(e){
            prev();
        });

        $next.click(function(e){
            next();
        });

        $pager.click('div', function(e){
            setPage($(e.target).index());
        });

        root.hover(function(e){
            var clear = e.type == 'mouseenter';
            setAuto(clear);
        });

        /* ==========================================================
            EXTRA FUNCTIONS
        ========================================================== */

        function next(){
            setPage(getNextPage());
        }

        function prev(){
            setPage(getPrevPage());
        }

        function buildPager(){
            $items.children().each(function(k,v){
                $pager.append('<div>'+ (k+1) +'</div>');
            });
            $pager.children(':eq(0)').addClass(conf.current);
        }

        function updatePager() {
            $pager.children().removeClass(conf.current).eq(getCurrentPage()).addClass(conf.current);
        }

        /* ==========================================================
            API
        ========================================================== */

        root.data('csRotator', {
            next: next,
            prev: prev,
            setPage: setPage,
        });
    }

    // jQuery plugin
    $.fn.csRotator = function(conf){
        var $this = this;

        $.each(this, function(){
            // return the api if selected container.
            if ($this.length == 1) {
                var el = $this.data('csRotator');
                if (el) { return el; }
            }
            conf = $.extend({}, $.cs.rotator.conf, conf);
            var instance = new Rotator($(this), conf);
        });        

        return this;
    }
})(jQuery);