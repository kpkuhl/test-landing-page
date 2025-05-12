// Initialize Supabase client
const supabaseUrl = 'https://ctlseuuhmtqyiwmkqjwy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0bHNldXVobXRxeWl3bWtxand5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MjU2NjksImV4cCI6MjA2MjQwMTY2OX0.KHM6daMqhI5P7KRECoBtjA6J7LWfDjWvpTYPGerkgyM';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// Debug logging
console.log('Environment check:', {
    hasSupabaseKey: !!supabaseKey,
    keyLength: supabaseKey ? supabaseKey.length : 0,
    url: supabaseUrl
});

if (!supabaseKey) {
    console.error('Supabase anon key is not set');
}

// Safari-compatible console logging
function safeLog(message, data) {
    try {
        if (data) {
            console.log(message, JSON.stringify(data));
        } else {
            console.log(message);
        }
    } catch (e) {
        console.log(message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const notifyForm = document.getElementById('notify-form');
    const statusMessage = document.getElementById('status-message');
    
    if (notifyForm) {
        notifyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email-input').value;
            const zipCodeInput = document.getElementById('zip-input').value;
            
            safeLog('Attempting to submit:', { email, zipCode: zipCodeInput });
            
            // Show loading state
            const submitButton = notifyForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            try {
                const response = await fetch('/api/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        zipCode: zipCodeInput
                    })
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Failed to submit form');
                }

                safeLog('Successfully submitted:', result);
                // Show success message
                statusMessage.textContent = 'Thank you for your interest! We\'ll be in touch soon.';
                statusMessage.style.display = 'block';
                statusMessage.style.color = 'green';
                notifyForm.reset();

            } catch (error) {
                safeLog('Error submitting form:', error);
                statusMessage.textContent = 'There was an error submitting your email. Please try again.';
                statusMessage.style.display = 'block';
                statusMessage.style.color = 'red';
            } finally {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
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