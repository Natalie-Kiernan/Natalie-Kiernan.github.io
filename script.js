(function () {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var lightboxImg = document.getElementById('lightbox-img');
    var closeBtn = document.getElementById('lightbox-close');
    var prevBtn = document.getElementById('lightbox-prev');
    var nextBtn = document.getElementById('lightbox-next');
    var items = document.querySelectorAll('.gallery-item');
    var images = Array.prototype.slice.call(
        document.querySelectorAll('.gallery-item img')
    ).filter(function (img) {
        return img.getAttribute('src');
    });
    var currentIndex = 0;
    var lastFocused = null;
    var focusables = [closeBtn, prevBtn, nextBtn].filter(Boolean);

    function openLightbox(index) {
        if (index < 0 || index >= images.length) return;

        currentIndex = index;
        var img = images[currentIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        lastFocused = document.activeElement;
        closeBtn.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        lightboxImg.src = '';
        lightboxImg.alt = '';
        if (lastFocused && typeof lastFocused.focus === 'function') {
            lastFocused.focus();
        }
    }

    function showPrev() {
        var nextIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(nextIndex);
    }

    function showNext() {
        var nextIndex = (currentIndex + 1) % images.length;
        openLightbox(nextIndex);
    }

    function isOpen() {
        return lightbox.classList.contains('open');
    }

    items.forEach(function (item) {
        item.addEventListener('click', function (e) {
            var clicked = e.target.closest('img');
            var img = clicked && item.contains(clicked)
                ? clicked
                : item.querySelector('img[src]');
            if (!img) return;

            var index = images.indexOf(img);
            if (index === -1) return;
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        showPrev();
    });
    if (nextBtn) nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        showNext();
    });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (!isOpen()) return;

        if (e.key === 'Escape') {
            closeLightbox();
            return;
        }

        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            showPrev();
            return;
        }

        if (e.key === 'ArrowRight') {
            e.preventDefault();
            showNext();
            return;
        }

        if (e.key === 'Tab' && focusables.length) {
            var first = focusables[0];
            var last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
})();


// Disables right-click menu across the entire site
document.addEventListener('contextmenu', event => event.preventDefault());

// Forces all current and future images to be undraggable
document.addEventListener('dragstart', (event) => {
  if (event.target.tagName === 'IMG') {
    event.preventDefault();
  }
});
