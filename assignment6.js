$(document).ready(function () {
    console.log("jQuery is ready!"); 

   
    const $toastStack = $('<div class="fw-toast-stack" aria-live="polite"></div>')
        .appendTo('body');

    function showToast(message, isError = false) {
        const $toast = $('<div class="fw-toast"></div>')
            .toggleClass('fw-toast-error', isError)
            .text(message)
            .hide()
            .appendTo($toastStack);

        $toast.fadeIn(200).delay(2600).fadeOut(400, function () {
            $(this).remove();
        });
    }

    window.finwiseToast = showToast;

   
    window.finwiseSubmit = function (form, successMessage) {
        const $form = $(form);
        const $button = $form.find('button[type="submit"]').first();
        if (!$button.length || $button.prop('disabled')) return;

        const originalHtml = $button.html();
        $button.prop('disabled', true).html(
            '<span class="spinner-border spinner-border-sm me-2" ' +
            'role="status" aria-hidden="true"></span>Please wait...'
        );

        setTimeout(function () {
            form.reset(); 
            $button.html(originalHtml).prop('disabled', false);
            showToast(successMessage);
        }, 1500);
    };

  
    const $progress = $('<div id="fw-scroll-progress" aria-hidden="true"></div>')
        .prependTo('body');

    function updateProgress() {
        const maxScroll = $(document).height() - $(window).height();
        const percentage = maxScroll > 0 ? ($(window).scrollTop() / maxScroll) * 100 : 100;
        $progress.css('width', Math.min(100, Math.max(0, percentage)) + '%');
    }

    $(window).on('scroll resize load', updateProgress);
    updateProgress();

    
    if ($('#services-form').length) {
        const $services = $('main section.row.g-4').first();
        const $items = $services.children('div').has('.card h4');
        const titles = $items.map(function () {
            return $(this).find('h4').first().text().trim();
        }).get();

        const $searchBox = $(
            '<section class="fw-search-box mb-4" aria-label="Search services">' +
                '<label for="fw-search" class="form-label fw-bold">Search our services</label>' +
                '<div class="fw-search-relative">' +
                    '<input id="fw-search" class="form-control" type="search" ' +
                           'placeholder="Try investment, retirement, or wealth..." ' +
                           'autocomplete="off" aria-autocomplete="list" ' +
                           'aria-controls="fw-suggestions" aria-expanded="false">' +
                    '<div id="fw-suggestions" class="fw-suggestions" role="listbox"></div>' +
                '</div>' +
                '<p id="fw-results" class="text-secondary small mt-2 mb-0" aria-live="polite"></p>' +
            '</section>'
        ).insertBefore($services);

        const $search = $searchBox.find('#fw-search');
        const $suggestions = $searchBox.find('#fw-suggestions');
        const $results = $searchBox.find('#fw-results');
        let selectedSuggestion = -1;

        const $textElements = $items.find('h4, p');
        $textElements.each(function () {
            $(this).data('originalText', $(this).text());
        });

        function escapeRegex(value) {
            return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        function highlight($element, searchTerm) {
            const original = $element.data('originalText');
            $element.empty();
            if (!searchTerm) {
                $element.text(original);
                return;
            }

            const pattern = new RegExp(escapeRegex(searchTerm), 'gi');
            let lastIndex = 0;
            let match;

            while ((match = pattern.exec(original)) !== null) {
                $element.append(document.createTextNode(original.slice(lastIndex, match.index)));
                $('<mark class="fw-highlight"></mark>')
                    .text(match[0])
                    .appendTo($element);
                lastIndex = pattern.lastIndex;
            }
            $element.append(document.createTextNode(original.slice(lastIndex)));
        }

        function hideSuggestions() {
            $suggestions.empty().hide();
            $search.attr('aria-expanded', 'false');
            selectedSuggestion = -1;
        }

        function selectSuggestion(value) {
            $search.val(value).trigger('input').focus();
            hideSuggestions();
        }

        function showSuggestions(query) {
            hideSuggestions();
            if (!query) return;

            const matches = titles.filter(name => name.toLowerCase().includes(query)).slice(0, 5);
            matches.forEach(function (name, index) {
                $('<button type="button" class="fw-suggestion" role="option"></button>')
                    .attr('id', 'fw-suggestion-' + index)
                    .text(name)
                    .on('click', function () { selectSuggestion(name); })
                    .appendTo($suggestions);
            });
            if (matches.length) {
                $suggestions.show();
                $search.attr('aria-expanded', 'true');
            }
        }

        $search.on('input', function () {
            const query = $(this).val().trim();
            const lowerQuery = query.toLowerCase();
            let visible = 0;

            $items.each(function () {
                const $item = $(this);
                const searchableText = $item.find('h4, p').map(function () {
                    return $(this).data('originalText');
                }).get().join(' ').toLowerCase();
                const found = !query || searchableText.includes(lowerQuery);
                $item.toggle(found);
                if (found) visible++;
                $item.find('h4, p').each(function () { highlight($(this), query); });
            });

            $results.text(visible ? visible + ' service(s) found' : 'No matching services found.');
            showSuggestions(lowerQuery);
        });

   
        $search.on('keydown', function (event) {
            const $options = $suggestions.children('button');
            if (event.key === 'Escape') {
                hideSuggestions();
                return;
            }
            if (!$options.length) return;

            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                selectedSuggestion += event.key === 'ArrowDown' ? 1 : -1;
                selectedSuggestion = (selectedSuggestion + $options.length) % $options.length;
                $options.removeClass('fw-selected').attr('aria-selected', 'false');
                $options.eq(selectedSuggestion).addClass('fw-selected').attr('aria-selected', 'true');
                $search.attr('aria-activedescendant', $options.eq(selectedSuggestion).attr('id'));
            } else if (event.key === 'Enter' && selectedSuggestion !== -1) {
                event.preventDefault();
                selectSuggestion($options.eq(selectedSuggestion).text());
            }
        });

        $(document).on('click', function (event) {
            if (!$(event.target).closest('.fw-search-box').length) hideSuggestions();
        });
        $search.trigger('input');

        $items.find('.card button').on('click', function () {
            const name = $(this).closest('.card').find('h4').text().trim();
            const $option = $('#service option').filter(function () {
                return $(this).text().trim() === name;
            }).first();
            if ($option.length) $('#service').val($option.val());
            showToast(name + ' selected. Complete the contact form below.');
            $('html, body').animate({scrollTop: $('#services-form').offset().top - 24}, 450);
        });
    }

  
    if ($('#cards').length) {
        const stats = [
            {value: $('#cards .card').length, label: 'Featured topics'},
            {value: $('#carousel .carousel-item').length, label: 'Gallery pictures'},
            {value: $('nav .nav-link').length, label: 'Site pages'}
        ];

        const $stats = $('<section class="fw-stats mb-4" aria-label="Finwise site statistics"></section>');
        stats.forEach(function (stat) {
            const $box = $('<div class="fw-stat"></div>');
            $('<strong class="fw-count">0</strong>').attr('data-target', stat.value).appendTo($box);
            $('<span></span>').text(stat.label).appendTo($box);
            $stats.append($box);
        });
        $stats.insertBefore('#cards');

        let animated = false;
        function animateCounters() {
            if (animated || !$stats.length) return;
            if ($stats.offset().top > $(window).scrollTop() + $(window).height() - 40) return;
            animated = true;
            $stats.find('.fw-count').each(function () {
                const $count = $(this);
                const target = Number($count.attr('data-target'));
                $({value: 0}).animate({value: target}, {
                    duration: 1200,
                    easing: 'swing',
                    step: function (now) { $count.text(Math.floor(now)); },
                    complete: function () { $count.text(target); }
                });
            });
        }
        $(window).on('scroll resize', animateCounters);
        animateCounters();


        const $copyArea = $(
            '<div class="fw-copy-area mt-3">' +
                '<code id="fw-copy-text">Track your spending.</code>' +
                '<button type="button" id="fw-copy-btn" class="btn btn-outline-primary btn-sm" ' +
                    'title="Copy tip"><span class="fw-copy-icon" aria-hidden="true">⧉</span> Copy</button>' +
                '<span id="fw-copy-status" class="fw-copy-status" role="status"></span>' +
            '</div>'
        );
        $('#tip-btn').parent().append($copyArea);

        $('#fw-copy-btn').on('click', async function () {
            const text = $('#fw-copy-text').text();
            let copied = false;
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text);
                    copied = true;
                } else {
                    const $temporary = $('<textarea></textarea>')
                        .val(text).css({position: 'fixed', opacity: 0}).appendTo('body');
                    $temporary[0].select();
                    copied = document.execCommand('copy');
                    $temporary.remove();
                }
            } catch (error) {
                copied = false;
            }

            if (copied) {
                const $button = $(this);
                $button.html('<span aria-hidden="true">✓</span> Copied!')
                    .attr('title', 'Copied to clipboard!');
                $('#fw-copy-status').text('Copied to clipboard!');
                showToast('Copied to clipboard!');
                setTimeout(function () {
                    $button.html('<span class="fw-copy-icon" aria-hidden="true">⧉</span> Copy')
                        .attr('title', 'Copy tip');
                    $('#fw-copy-status').text('');
                }, 2200);
            } else {
                showToast('Clipboard permission denied. Try again on HTTPS or localhost.', true);
            }
        });

      
        $('.form-step').first().closest('form').on('submit', function (event) {
            event.preventDefault();
            showToast('Demo form completed (nothing was sent to a server).');
        });
    }

   
    const $lazyImages = $('img[data-src]');
    function loadImage(image) {
        const $image = $(image);
        const src = $image.attr('data-src');
        if (!src) return;
        $image.attr('src', src).removeAttr('data-src');
    }

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {rootMargin: '200px 0px'});
        $lazyImages.each(function () { observer.observe(this); });
    } else {
        function loadVisible() {
            $lazyImages.each(function () {
                if (!$(this).attr('data-src')) return;
                const top = $(this).offset().top;
                if (top < $(window).scrollTop() + $(window).height() + 200) loadImage(this);
            });
        }
        $(window).on('scroll resize', loadVisible);
        loadVisible();
    }

    
    $('#carousel').on('slide.bs.carousel', function (event) {
        $(event.relatedTarget).find('img[data-src]').each(function () { loadImage(this); });
    });
});
