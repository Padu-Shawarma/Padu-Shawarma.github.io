
document.addEventListener('DOMContentLoaded', function() {

    const animatedElements = document.querySelectorAll('.logo, .padu, .shawarma, .restaurant, .pageText, .pageImage, .small-images-container');
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
    });

    const imageLinks = document.querySelectorAll('.image-link');
    imageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const image = this.querySelector('.small-image');
            const targetUrl = this.href;
            image.classList.add('clicked');
            setTimeout(function() {
                window.open(targetUrl, '_blank');
            }, 500);
        });
    });

    // true = 3000 only & false = wait until all downloaded.
    const useForcedWait = false;

    if (useForcedWait) {

        setTimeout(function() {
            hideLoaderAndStartAnimations();
        }, 3000);
    } else {
        
        const images = document.querySelectorAll('img');
        let imagesLoaded = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
            hideLoaderAndStartAnimations();
            return;
        }

        images.forEach(img => {
            if (img.complete) {
                imageLoaded();
            } else {
                img.addEventListener('load', imageLoaded);
                img.addEventListener('error', imageLoaded);
            }
        });

        function imageLoaded() {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                hideLoaderAndStartAnimations();
            }
        }
    }

    function hideLoaderAndStartAnimations() {
        const loader = document.getElementById('loadingOverlay');
        if (loader) {
            loader.style.display = 'none';
        }
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }
});

