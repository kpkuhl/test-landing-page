document.addEventListener('DOMContentLoaded', () => {
    const notifyForm = document.getElementById('notify-form');
    const hiddenIframe = document.getElementById('hidden_iframe');
    
    if (notifyForm) {
        notifyForm.addEventListener('submit', (e) => {
            // Let the form submit naturally to the iframe
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