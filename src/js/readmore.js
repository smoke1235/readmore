/*!
 * readMore v1.0.0
 * by Peter Donders
 *
 * More info:
 * // TODO: NEED TO ADD
 *
 * Copyright Peter Donders
 * Released under the ??? license
 *
 * @preserve
 */

// Uses Node, AMD or browser globals to create a module.
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.readmore = factory(root.jQuery);
    }
}(this, function ($) {

    function ReadMore(options) {
        this.init();

        // options
        this.options = jQuery.extend({}, this.constructor.defaults);
        this.option(options);
    }

    ReadMore.defaults = {
        extraHight: 50,

        // Allow all above example options to include a trailing comma and
        // prevent fear when commenting out the last value.
        jsonHappyToken: false
    };

    ReadMore.prototype.option = function(options) {
        jQuery.extend(this.options, options);
    };


    ReadMore.prototype.init = function() {
        var self = this;
        // Both enable and build methods require the body tag to be in the DOM.
        jQuery(document).ready(function() {
            self.enable();
        });
    };

    // Loop through anchors and buttons looking for either data-readmore attributes or rel attributes
    // that contain 'readmore'. When these are clicked, start readmore.
    ReadMore.prototype.enable = function() {
        var self = this;
        jQuery('body').on('click', 'button[rel^=readmore], a[rel^=readmore], a[data-readmore], button[data-readmore]', function(event) {
            self.start(jQuery(event.currentTarget));
            return false;
        });
    };

    // start the action
    ReadMore.prototype.start = function($link) {
        var totalHeight = 0;
        var $el = jQuery($link);
        var $p  = $el.parent();
        var $c  = $p.parent();
        var $up = $c.find('.sidebar-box');
        var $ps = $up.find('*');

        // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
        $ps.each(function() {
            console.log(jQuery(this).outerHeight());
            totalHeight += jQuery(this).outerHeight();
            // FAIL totalHeight += $(this).css("margin-bottom");
        });

        totalHeight -= this.options.extraHight;

        $up
            .css({
                // Set height to prevent instant jumpdown when max height is removed
                'height': $up.height(),
                'max-height': 9999
            })
            .animate({
                'height': totalHeight
            });

        // fade out read-more
        $p.fadeOut();

    };


    return new ReadMore();
}));
