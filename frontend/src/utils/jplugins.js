(function($) {

    $.fn.isAboveViewport    =   function()
    {
        if ($(this).offset().top + $(this).outerHeight() <= $(window).scrollTop()) {
            return true;
        }

        return false;
    };

})(jQuery);
