export function validateContactForm(form) {
  if (!form.name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) || !form.message.trim()) {
    return 'Please add your name, a valid email, and a message.';
  }
  return '';
}
