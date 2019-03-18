(function ($) {

    $(document).ready(function () {
        let $grid = $('.flexbox-packery');
        // Create a collection of blocks available to this user

        // initialize Packery
        $grid.packery({
            // options
            itemSelector: '.block',
            gutter: 10,
            percentPosition: true
        });

        // Can call images loaded here if images are overlapping. Need to add imagesLoaded library
        $grid.packery();
    });

})(jQuery);