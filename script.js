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
      const followersList = event.target.result;

      // Read the contents of the following list file
      const followingFileReader = new FileReader();
      followingFileReader.onload = function (event) {
        const followingList = event.target.result;

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
  // Split the lists into arrays
  const followersArray = followersList.split('\n');
  const followingArray = followingList.split('\n');

  // Clean up the arrays by removing any empty strings or whitespace
  const cleanedFollowersArray = followersArray.filter(item => item.trim() !== '');
  const cleanedFollowingArray = followingArray.filter(item => item.trim() !== '');

  // Perform the comparison
  const commonElements = cleanedFollowersArray.filter(item => cleanedFollowingArray.includes(item));

  // Display the comparison results
  console.log('Followers List:', cleanedFollowersArray);
  console.log('Following List:', cleanedFollowingArray);
  console.log('Common Elements:', commonElements);
}
