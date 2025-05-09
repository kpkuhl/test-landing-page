document.addEventListener('DOMContentLoaded', () => {
    const notifyForm = document.getElementById('notify-form');
    
    if (notifyForm) {
        notifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = notifyForm.querySelector('input[type="email"]').value;
            
            // Create a form and submit it
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://docs.google.com/forms/d/e/1FAIpQLSfaQQztaN1iTRVYjLssNZbtVwzRON_BcYYD7U9bRbvvQLLM-Q/formResponse';
            
            // Add the email field
            const emailInput = document.createElement('input');
            emailInput.type = 'hidden';
            emailInput.name = 'entry.2005620554';
            emailInput.value = email;
            form.appendChild(emailInput);
            
            // Add a redirect field
            const redirectInput = document.createElement('input');
            redirectInput.type = 'hidden';
            redirectInput.name = 'submit';
            redirectInput.value = 'Submit';
            form.appendChild(redirectInput);
            
            // Add the form to the page and submit it
            document.body.appendChild(form);
            form.submit();
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