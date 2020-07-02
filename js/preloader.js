// Get all images on page in HTMLCollection
let images_all = document.images,
  // Get all images qty
  images_total_count = images_all.length,
  // Set image counter
  images_loaded_count = 0,
  // Get preloader block
  preloader = document.querySelector('#preloader'),
  // Get percent block
  show_percent = document.querySelector('#percent'),
  // Get progress block
  show_progress = document.querySelector('.progress');

// Сycle start
for (let image of images_all) {
  // Create new images elements
  let image_clone = new Image();
  // Assign the origin image path to new image
  image_clone.src = image.src;
  // Start Listener on load
  image_clone.addEventListener('load', image_loader);
  // Start Listener on erroe
  image_clone.addEventListener('error', function () {
    // Run function on error and give image
    image_none(image);
  });
}

// Run counter and showing loader progress
function image_loader() {
  // Add plus image counter
  images_loaded_count++;
  // Calc percent from tolal images to loaded
  let calc_percent = `${Math.trunc((100 / images_total_count) * images_loaded_count)}%`;
  // Show percent in HTML
  show_percent.innerHTML = calc_percent;
  // Show progress in HTML
  show_progress.style.width = calc_percent;

  // Check and stop when all images was loaded
  if (images_loaded_count >= images_total_count) {
    // Set delay before show content on page
    setTimeout(function () {
      // Add hide class to preloader if dont contains
      if (!preloader.classList.contains('preloader-style__loader__done')) {
        preloader.classList.add('preloader-style__loader__done');
      }
    }, 500);
  }
}

// Error function
function image_none(error_image) {
  // Create error image path
  let bad_way = 'http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png';
  // Assing new path to error image
  error_image.src = bad_way;
  // Run counter and showing loader progress againe
  image_loader();
}
