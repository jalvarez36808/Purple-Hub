document.addEventListener('DOMContentLoaded', function() {
    console.log('Checklist initialization started');
    
    // Initialize from localStorage if available
    initializeChecklistStatus();
    
    // Initialize only the main dropdown with Bootstrap
    const mainDropdown = document.getElementById('checklistDropdown');
    if (mainDropdown) {
        new bootstrap.Dropdown(mainDropdown);
    }
    
    // Handle submenu dropdowns
    document.querySelectorAll('.dropdown-submenu').forEach(submenu => {
        const toggle = submenu.querySelector('.dropdown-toggle');
        const menu = submenu.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            toggle.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other submenus at the same level
                const parent = this.closest('.dropdown-menu');
                if (parent) {
                    const siblings = parent.querySelectorAll('.dropdown-submenu > .dropdown-toggle.show');
                    siblings.forEach(sibling => {
                        if (sibling !== this) {
                            sibling.classList.remove('show');
                            const siblingMenu = sibling.nextElementSibling;
                            if (siblingMenu) {
                                siblingMenu.classList.remove('show');
                            }
                        }
                    });
                }
                
                // Toggle current submenu
                toggle.classList.toggle('show');
                menu.classList.toggle('show');
            };
        }
    });
    
    // Close submenus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-submenu')) {
            document.querySelectorAll('.dropdown-submenu .dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
                const toggle = menu.previousElementSibling;
                if (toggle) {
                    toggle.classList.remove('show');
                }
            });
        }
    });
    
    // Close submenus when main dropdown is closed
    mainDropdown?.addEventListener('hide.bs.dropdown', function() {
        document.querySelectorAll('.dropdown-submenu .dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
            const toggle = menu.previousElementSibling;
            if (toggle) {
                toggle.classList.remove('show');
            }
        });
    });
    
    // Initialize checkboxes
    initializeCheckboxes();
});

function initializeCheckboxes() {
    const checkboxes = document.querySelectorAll('.form-check-input');
    console.log('Found checkboxes:', checkboxes.length);
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function(e) {
            const group = this.dataset.group;
            updateItemStyle(this);
            updateGroupStatus(group);
            updateParentGroupStatus(this);
            saveToLocalStorage();
        });
        
        // Initialize styles
        updateItemStyle(checkbox);
        updateGroupStatus(checkbox.dataset.group);
    });
}

function updateItemStyle(checkbox) {
    const item = checkbox.closest('.dropdown-item');
    if (!item) return;
    
    const text = item.querySelector('span');
    if (!text) return;
    
    if (checkbox.checked) {
        text.style.color = 'var(--bs-primary)';
        text.style.fontWeight = '500';
    } else {
        text.style.color = '';
        text.style.fontWeight = '';
    }
}

function updateGroupStatus(group) {
    if (!group) return;
    
    const items = document.querySelectorAll(`[data-group="${group}"]`);
    let total = items.length;
    let completed = Array.from(items).filter(item => item.checked).length;
    
    // Update all status elements for this group
    document.querySelectorAll(`.completion-status[data-group="${group}"]`).forEach(statusElement => {
        statusElement.textContent = `(${completed}/${total})`;
        
        if (completed === total && total > 0) {
            statusElement.style.backgroundColor = 'rgba(var(--bs-success-rgb), 0.1)';
            statusElement.style.color = 'var(--bs-success)';
        } else if (completed > 0) {
            statusElement.style.backgroundColor = 'rgba(var(--bs-primary-rgb), 0.1)';
            statusElement.style.color = 'var(--bs-primary)';
        } else {
            statusElement.style.backgroundColor = '';
            statusElement.style.color = '';
        }
    });
}

function updateParentGroupStatus(checkbox) {
    const submenu = checkbox.closest('.dropdown-submenu');
    if (!submenu) return;
    
    const parentGroup = submenu.dataset.group;
    if (parentGroup) {
        updateGroupStatus(parentGroup);
        
        // Recursively update parent groups
        const parentSubmenu = submenu.parentElement.closest('.dropdown-submenu');
        if (parentSubmenu) {
            updateParentGroupStatus(parentSubmenu.querySelector('.form-check-input'));
        }
    }
}

function saveToLocalStorage() {
    const status = {};
    document.querySelectorAll('.form-check-input').forEach(checkbox => {
        status[checkbox.id] = checkbox.checked;
    });
    localStorage.setItem('checklistStatus', JSON.stringify(status));
}

function initializeChecklistStatus() {
    const saved = localStorage.getItem('checklistStatus');
    if (saved) {
        const status = JSON.parse(saved);
        Object.entries(status).forEach(([id, checked]) => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = checked;
                updateItemStyle(checkbox);
                updateGroupStatus(checkbox.dataset.group);
            }
        });
    }
}
