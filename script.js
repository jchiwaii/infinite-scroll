// Set up the Unsplash API

const contentFilter = "high";
const count = 10;
const apiKey = "nhs5fnzInY6ooKFUZCFEa3rq6XaUWAMwrP5rUSundi0";

const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&content_filter=${contentFilter}`;

// Function to fetch images from Unsplash API
async function fetchImages() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// Function to display images on the page
fetchImages();
