// contact-form.js
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin ml-2"></i>';
        
        try {
          const formData = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            phone: contactForm.phone.value,
            subject: contactForm.subject.value,
            message: contactForm.message.value
          };
  
          // Replace with your actual backend endpoint
          const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });
  
          const result = await response.json();
          
          if (response.ok) {
            // Show success message (you could use a nicer alert/notification)
            showAlert('success', 'Thank you for your message! We will contact you shortly.');
            contactForm.reset();
          } else {
            showAlert('error', result.error || 'Failed to send message. Please try again.');
          }
        } catch (error) {
          console.error('Error:', error);
          showAlert('error', 'Network error. Please check your connection and try again.');
        } finally {
          // Reset button state
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
        }
      });
    }
  
    // Function to show alerts (replace with your preferred notification system)
    function showAlert(type, message) {
      // Simple alert for now - consider using a toast notification library
      alert(`${type.toUpperCase()}: ${message}`);
      
      // Example for a more sophisticated notification:
      // const alertDiv = document.createElement('div');
      // alertDiv.className = `fixed top-4 right-4 p-4 rounded-md shadow-lg ${
      //   type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      // }`;
      // alertDiv.textContent = message;
      // document.body.appendChild(alertDiv);
      // setTimeout(() => alertDiv.remove(), 5000);
    }
  });