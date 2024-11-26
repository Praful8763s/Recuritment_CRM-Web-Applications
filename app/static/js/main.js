// Form submission handlers
document.addEventListener('DOMContentLoaded', function() {
    // Admin Settings Form Handler
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(settingsForm);
            const settings = Object.fromEntries(formData.entries());
            
            // Show loading state
            showNotification('Saving settings...', 'info');
            
            // Simulate API call to save settings
            setTimeout(() => {
                showNotification('Settings saved successfully!', 'success');
            }, 1000);
        });
    }

    // Candidate Sourcing Form Handler
    const candidateForm = document.getElementById('candidateForm');
    if (candidateForm) {
        candidateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(candidateForm);
            const candidateData = Object.fromEntries(formData.entries());
            
            // Validate required fields
            if (!validateCandidateForm(candidateData)) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Show loading state
            showNotification('Importing candidate...', 'info');
            
            // Simulate API call to import candidate
            setTimeout(() => {
                showNotification('Candidate imported successfully!', 'success');
                candidateForm.reset();
            }, 1000);
        });
    }

    // Draft saving functionality
    const saveDraftBtn = document.querySelector('button[type="button"]');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            const formData = new FormData(candidateForm);
            const draftData = Object.fromEntries(formData.entries());
            
            // Save to localStorage
            localStorage.setItem('candidateDraft', JSON.stringify(draftData));
            showNotification('Draft saved!', 'success');
        });

        // Load draft if exists
        const savedDraft = localStorage.getItem('candidateDraft');
        if (savedDraft) {
            const draftData = JSON.parse(savedDraft);
            Object.entries(draftData).forEach(([key, value]) => {
                const input = candidateForm.querySelector(`[name="${key}"]`);
                if (input) input.value = value;
            });
        }
    }
});

// Settings navigation
document.querySelectorAll('.list-group-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        // Remove active class from all items
        document.querySelectorAll('.list-group-item').forEach(i => {
            i.classList.remove('active');
        });
        // Add active class to clicked item
        this.classList.add('active');
    });
});

// Utility Functions
function validateCandidateForm(data) {
    const requiredFields = ['full_name', 'linkedin_url'];
    return requiredFields.every(field => data[field] && data[field].trim() !== '');
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Position notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '1000';
    
    // Remove after delay
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// LinkedIn Profile Auto-fill (Mock functionality)
function autoFillLinkedInProfile() {
    // This would normally interact with the Chrome extension
    const mockProfile = {
        full_name: 'John Doe',
        current_position: 'Senior Software Engineer',
        linkedin_url: 'https://linkedin.com/in/johndoe',
        email: 'john.doe@example.com'
    };

    Object.entries(mockProfile).forEach(([key, value]) => {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) input.value = value;
    });
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save draft
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const saveDraftBtn = document.querySelector('button[type="button"]');
        if (saveDraftBtn) saveDraftBtn.click();
    }
});