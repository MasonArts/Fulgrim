// Mapping of keywords to their corresponding messages
const keyword = { BBC, FOX, CNN, Reunters
                };
const keywordMessages = {
  "BBC": "You are visiting a BBC site!",
  "FOX": "You are visiting a FOX site!",
  "CNN": "You are visiting a CNN site!",
  "Reuters": "You are visiting a Reuters site!"
};

// Function to check if any keyword is present in the URL and return the corresponding message
function checkKeywordsInURL(url) {
  for (let keyword in keywordMessages) {
    if (url.includes(keyword)) {
      return keywordMessages[keyword]; // Return the associated message
    }
  }
  return null; // No keywords found
}

// Function to show a notification
function showNotification(message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png", // Make sure to have an icon file
    title: "Keyword Found",
    message: message,
    priority: 2
  });
}

// Handle messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const url = request.url; // Get the URL from the request
  const message = checkKeywordsInURL(url); // Check for keywords in the URL
  
  if (message) {
    showNotification(message); // Show notification if a keyword is found
  } else {
    console.log("No keywords found in URL."); // Log if no keywords are found
  }
});

// Listen for when the extension is activated
chrome.action.onClicked.addListener((tab) => {
  const url = tab.url; // Get the current tab's URL
  const message = checkKeywordsInURL(url); // Check for keywords in the URL
  
  if (message) {
    showNotification(message); // Show notification if a keyword is found
  } else {
    console.log("No keywords found in URL:", url); // Log if no keywords are found
  }
});
