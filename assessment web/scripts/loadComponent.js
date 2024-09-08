// Function to load a component from a given path
function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
            }
            return response.text(); // Convert the response to text (HTML content)
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data; // Insert the HTML content
        })
        .catch(error => console.error('Error loading component:', error)); // Log any errors to the console
}

// Load the components when the window has finished loading
window.onload = function () {
    loadComponent('header', '../components/header/header.html'); // Load the header component into the div with ID 'header1'
};
