// Read the stored data from localStorage
const followersData = JSON.parse(localStorage.getItem('followersData'));
const followingData = JSON.parse(localStorage.getItem('followingData'));

if (!followersData || !followingData) {
  console.error("Data not found in localStorage. Please upload both followers.html and following.html first.");
} else {
  // Find the accounts that don't follow you back
  const accountsNotFollowingBack = findUncommonElements(followingData, followersData);
  createResultsSection(accountsNotFollowingBack, 'Accounts that don\'t follow you back');

  // Find the accounts you don't follow back
  const accountsYouDontFollowBack = findUncommonElements(followersData, followingData);
  createResultsSection(accountsYouDontFollowBack, 'Accounts you don\'t follow back');
}

function findUncommonElements(list1, list2) {
  return list1.filter(element => !list2.includes(element));
}

function createResultsSection(data, heading) {
  if (data.length === 0) {
    return;
  }

  const resultsListDiv = document.getElementById('resultsList');

  // Create a button for the results section
  const button = document.createElement('button');
  button.textContent = heading;
  resultsListDiv.appendChild(button);

  // Create a list to display the results
  const resultsList = document.createElement('ul');
  data.forEach(element => {
    const listItem = document.createElement('li');
    listItem.textContent = element;
    resultsList.appendChild(listItem);
  });

  // Append the results list to the page but hide it initially
  resultsList.style.display = 'none';
  resultsListDiv.appendChild(resultsList);

  // Add click event to toggle visibility when the button is clicked
  button.addEventListener('click', () => {
    if (resultsList.style.display === 'none') {
      resultsList.style.display = 'block';
    } else {
      resultsList.style.display = 'none';
    }
  });
}
