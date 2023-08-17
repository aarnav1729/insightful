const innerSelector = "div._a6-p > div > div:nth-child(1) > a";

document.getElementById('processButton').addEventListener('click', handleFile);

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
      const downloadLinkId = 'downloadLink';
      downloadResult(resultTxt, fileName, downloadLinkId);

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

function downloadResult(resultText, fileName, downloadLinkId) {
  const downloadLink = document.getElementById(downloadLinkId);
  const blob = new Blob([resultText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = fileName;
  downloadLink.style.display = 'block';
}