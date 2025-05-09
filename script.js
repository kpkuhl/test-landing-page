// Your Google Cloud Project credentials
const CLIENT_ID = 'YOUR_CLIENT_ID';
const API_KEY = 'YOUR_API_KEY';
const FORM_ID = '1FAIpQLSfaQQztaN1iTRVYjLssNZbtVwzRON_BcYYD7U9bRbvvQLLM-Q';

// Initialize the Google API client
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ['https://forms.googleapis.com/$discovery/rest?version=v1'],
        scope: 'https://www.googleapis.com/auth/forms'
    }).then(() => {
        console.log('Google API client initialized');
    }).catch(error => {
        console.error('Error initializing Google API client:', error);
    });
}

// Load the Google API client
gapi.load('client', initClient);

document.addEventListener('DOMContentLoaded', () => {
    const notifyForm = document.getElementById('notify-form');
    
    if (notifyForm) {
        notifyForm.addEventListener('submit', (e) => {
            // Let the form submit naturally
            setTimeout(() => {
                alert('Thank you for your interest! We\'ll be in touch soon.');
                notifyForm.reset();
            }, 1000);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 