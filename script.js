// Get the CTA button element
const ctaButton = document.querySelector('.cta-button');

// Add event listener to the CTA button
ctaButton.addEventListener('click', handleCTAButtonClick);

// Function to handle CTA button click event
function handleCTAButtonClick(event) {
  event.preventDefault();
  
  // Perform any necessary actions here, such as redirecting to the upload page
  window.location.href = 'upload.html';
}
