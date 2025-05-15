const imageContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Set up the Unsplash API
const contentFilter = "high";
let count = 5;
const apiKey = UNSPLASH_API_KEY;

const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&content_filter=${contentFilter}`;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}

function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Function to create elements for each image
function displayImages() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Add event listener for image load
    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Function to fetch images from Unsplash API
async function fetchImages() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    photosArray = await response.json();
    displayImages();
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// Function to display images on the page
fetchImages();

// Event listener for the "Load More" button
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    loader.hidden = false;
    fetchImages();
  }
});
