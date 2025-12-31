function validateContactForm({ name, email, message }) {
  if (!name || !email || !message) {
    return { valid: false, error: 'Missing required fields: name, email, message' };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Check message length
  if (message.trim().length < 10) {
    return { valid: false, error: 'Message must be at least 10 characters long' };
  }

  return { valid: true };
}

module.exports = { validateContactForm };
