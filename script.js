const innerSelector = "div._a6-p > div > div:nth-child(1) > a";

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton");
  const navList = document.getElementById("navList");

  menuButton.addEventListener("click", function () {
    navList.classList.toggle("hidden");
  });

  const processButton = document.getElementById("processButton");
  processButton.addEventListener("click", handleFile);
});

function handleFile() {
  const fileInput = document.getElementById('fileInput');
  const files = fileInput.files;

  if (files.length !== 1) {
    console.log("Please select a file.");
    return;
  }

  const file = files[0];
  const filePromise = readFileAsText(file);

  filePromise
    .then(result => {
      const extractedData = extractData(result, innerSelector);
      const resultTxt = createResultText(extractedData);

      const fileName = 'followers.txt';
      downloadResult(resultTxt, fileName);

      // Store the extractedData in localStorage
      localStorage.setItem('followersData', JSON.stringify(extractedData));
    })
    .catch(error => {
      console.error("Error occurred while reading file or generating result:", error);
    });
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      resolve(e.target.result);
    };
    reader.onerror = function (e) {
      reject(e.target.error);
    };
    reader.readAsText(file);
  });
}

function extractData(htmlContent, innerSelector) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  const elements = Array.from(doc.querySelectorAll(innerSelector));
  const data = elements.map(el => el.innerHTML.trim());

  return data;
}

function createResultText(data) {
  return data.join('\n');
}

function downloadResult(resultText, fileName) {
  const blob = new Blob([resultText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.style.display = 'none';
  document.body.appendChild(a);
  
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}