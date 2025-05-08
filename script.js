document.addEventListener('DOMContentLoaded', () => {
    const notifyForm = document.getElementById('notify-form');
    
    if (notifyForm) {
        notifyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = notifyForm.querySelector('input[type="email"]').value;
            
            try {
                // Google Form submission URL
                const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfaQQztaN1iTRVYjLssNZbtVwzRON_BcYYD7U9bRbvvQLLM-Q/formResponse';
                
                // Create form data
                const formData = new FormData();
                formData.append('entry.1', email);
                
                // Submit to Google Form
                const response = await fetch(formUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData
                });
                
                // Show success message
                alert('Thank you for your interest! We\'ll be in touch soon.');
                notifyForm.reset();
                
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your email. Please try again.');
            }
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