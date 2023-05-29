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

  // Extract usernames from the HTML structure
  const usernamesFromHTML = extractUsernamesFromHTML();

  // Clean up the arrays by removing any empty strings or whitespace
  const cleanedFollowersArray = followersArray.filter(item => item.trim() !== '');
  const cleanedFollowingArray = followingArray.filter(item => item.trim() !== '');

  // Find common and uncommon elements
  const commonElements = cleanedFollowersArray.filter(item => cleanedFollowingArray.includes(item));
  const uncommonElements = cleanedFollowingArray.filter(item => !cleanedFollowersArray.includes(item) && !usernamesFromHTML.includes(item));

  // Generate the .txt file content
  const txtContent = uncommonElements.join('\n');

  // Create a Blob from the .txt content
  const blob = new Blob([txtContent], { type: 'text/plain' });

  // Create a download link for the .txt file
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = 'uncommon-usernames.txt';
  downloadLink.innerText = 'Download Uncommon Usernames';

  // Append the download link to the placeholder element
  const uncommonElementsLink = document.getElementById('uncommon-elements-link');
  uncommonElementsLink.innerHTML = '';
  uncommonElementsLink.appendChild(downloadLink);
}

// Custom function to extract usernames from HTML structure
function extractUsernamesFromHTML() {
  const innerSelector = "div._a6-p > div > div:nth-child(1) > a";
  const listContainerSelector = "body > div > div > div > div._a705 > div._a706";
  const usernames = [];
  const listContainer = document.querySelector(listContainerSelector);

  if (listContainer) {
    const usernamesElements = listContainer.querySelectorAll(innerSelector);
    usernamesElements.forEach(element => {
      const username = element.innerHTML;
      usernames.push(username);
    });
  }

  return usernames;
}
