document.addEventListener("DOMContentLoaded", () => {
    fetch('../Components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });
});