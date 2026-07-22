(function () {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var lightboxImg = document.getElementById('lightbox-img');
    var closeBtn = document.getElementById('lightbox-close');
    var items = document.querySelectorAll('.gallery-item');

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        lightboxImg.src = '';
    }

    items.forEach(function (item) {
        item.addEventListener('click', function () {
            var img = item.querySelector('img');
            openLightbox(img.src, img.alt);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
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