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

// Get the upload form element
const uploadForm = document.getElementById('upload-form');

// Add event listener to the form submission
uploadForm.addEventListener('submit', handleFormSubmit);

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  // Get the followers list file input element and its selected file
  const followersFileInput = document.getElementById('followers-file');
  const followersFile = followersFileInput.files[0];

  // Get the following list file input element and its selected file
  const followingFileInput = document.getElementById('following-file');
  const followingFile = followingFileInput.files[0];

  // Check if files are selected
  if (followersFile && followingFile) {
    // Read the contents of the followers list file
    const followersFileReader = new FileReader();
    followersFileReader.onload = function (event) {
      const followersList = event.target.result.split('\n');

      // Read the contents of the following list file
      const followingFileReader = new FileReader();
      followingFileReader.onload = function (event) {
        const followingList = event.target.result.split('\n');

        // Call the compareLists function with the followers and following lists
        compareLists(followersList, followingList);
      };
      followingFileReader.readAsText(followingFile);
    };
    followersFileReader.readAsText(followersFile);
  }
}

// Function to compare the followers and following lists
function compareLists(followersList, followingList) {
  // Perform the comparison logic here
  // For example, you can iterate over the lists and compare the strings

  // Output the comparison result
  console.log('Followers List:', followersList);
  console.log('Following List:', followingList);
}
