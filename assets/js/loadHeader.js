document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM fully loaded and parsed');
    fetch('header.html')
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
            // Initialize checklist after header is loaded
            if (typeof initializeChecklistStatus === 'function') {
                initializeChecklistStatus();
                // Re-attach event listeners
                document.querySelectorAll('.form-check-input').forEach(checkbox => {
                    checkbox.addEventListener('change', function(e) {
                        const group = this.dataset.group;
                        const type = this.dataset.type;
                        const id = this.id;
                        
                        if (type === 'na') {
                            if (this.checked) {
                                document.getElementById(id.replace('NA', 'Complete')).checked = false;
                            }
                        } else if (type === 'complete') {
                            if (this.checked) {
                                document.getElementById(id.replace('Complete', 'NA')).checked = false;
                            }
                        }
                        
                        updateGroupStatus(group);
                        saveToLocalStorage();
                    });
                });
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
