// Initialize Supabase client
const supabaseUrl = 'https://ctlseuuhmtqyiwmkqjwy.supabase.co';
const supabaseKey = window.__SUPABASE_ANON_KEY__;

// Debug logging
console.log('Environment check:', {
    hasSupabaseKey: !!supabaseKey,
    keyLength: supabaseKey ? supabaseKey.length : 0,
    url: supabaseUrl
});

if (!supabaseKey) {
    console.error('Supabase anon key is not set');
}
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

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
            // Convert zip code to integer if it exists
            const zipCode = zipCodeInput ? parseInt(zipCodeInput, 10) : null;
            
            safeLog('Attempting to submit:', { email, zipCode });
            
            // Show loading state
            const submitButton = notifyForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            try {
                // Insert the data into the subscribers table
                const { data, error } = await supabaseClient
                    .from('subscribers')
                    .insert([
                        { 
                            email: email,
                            zip_code: zipCode // This will be null if no zip code was entered
                        }
                    ]);

                if (error) {
                    safeLog('Supabase error:', error);
                    throw error;
                }

                safeLog('Successfully submitted:', data);
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