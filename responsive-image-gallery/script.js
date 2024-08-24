let currentImageIndex = 0;
const images = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

// Function to open the lightbox with the clicked image
function openLightbox(index) {
    currentImageIndex = index;
    const img = images[index];
    lightboxImg.src = img.src;
    lightboxCaption.innerText = img.alt;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Disable scrolling
}

// Function to close the lightbox
function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// Function to navigate through the gallery
function navigateGallery(direction) {
    currentImageIndex += direction;

    // Looping through the gallery
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }

    openLightbox(currentImageIndex);
}

// Automatic slideshow
let slideshowInterval = setInterval(() => {
    navigateGallery(1);
}, 5000); // Change the image every 5 seconds

// Stop slideshow when lightbox is open
lightbox.addEventListener('click', () => {
    clearInterval(slideshowInterval);
    closeLightbox();
});

// Add click event to gallery items to open lightbox
images.forEach((img, index) => {
    img.addEventListener('click', () => {
        clearInterval(slideshowInterval); // Stop slideshow when image is clicked
        openLightbox(index);
    });
});

// Add event listener for keyboard navigation
document.addEventListener('keydown', (event) => {
    if (lightbox.style.display === 'block') {
        if (event.key === 'ArrowRight') {
            navigateGallery(1);
        } else if (event.key === 'ArrowLeft') {
            navigateGallery(-1);
        } else if (event.key === 'Escape') {
            closeLightbox();
        }
    }
});
