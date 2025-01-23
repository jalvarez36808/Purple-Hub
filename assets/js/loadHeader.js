document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM fully loaded and parsed');
    fetch('../Components/header.html')
        .then(response => {
            console.log('Fetch response:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Fetched data:', data);
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});