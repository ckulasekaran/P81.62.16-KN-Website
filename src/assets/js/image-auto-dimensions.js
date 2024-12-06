document.addEventListener('DOMContentLoaded', () => {
  const galleryLinks = document.querySelectorAll('#gallery a');

  galleryLinks.forEach(link => {
    const img = new Image();

    // Set the src to the full-size image URL
    img.src = link.href;

    // When the image loads, add data-pswp-width and data-pswp-height
    img.onload = () => {
      link.setAttribute('data-pswp-width', img.naturalWidth);
      link.setAttribute('data-pswp-height', img.naturalHeight);
    };

    // Handle errors if the image cannot load
    img.onerror = () => {
      console.error(`Failed to load image: ${img.src}`);
    };
  });
});