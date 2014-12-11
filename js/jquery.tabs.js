'use strict';

$.fn.extend({
    tabs: function () {
        this.each(function eachTab(index) {
            $(this).children('li')
                .first().children('a').addClass('is-active')
                .next().addClass('is-open').show();
        });

        this.on('click', 'li > a', function tabClick(event) {
            event.preventDefault();
            var $this = $(this);

            if (!$this.hasClass('is-active')) {
                var $accordionTabs = $(event.delegateTarget);

                $accordionTabs.find('.is-open').removeClass('is-open').hide();

                $this.next().toggleClass('is-open').toggle();
                $accordionTabs.find('.is-active').removeClass('is-active');

                $this.addClass('is-active');
            }
        });

        return this;
    }
});
