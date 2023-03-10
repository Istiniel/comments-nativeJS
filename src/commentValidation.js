function validateName(name) {
  if (name.length < 2) return 'Name should contain at least 2 characters';

  if (!/[A-ZА-Я]/.test(name)) {
    return 'Name should contain at least 1 uppercase';
  }

  return false;
}

function validateText(text) {
  if (text.length < 10) return 'Message should contain at least 10 characters';

  if (!/[A-ZА-Я].*[A-ZА-Я]/.test(text)) {
    return 'Message should contain at least 2 uppercase';
  }

  return false;
}

export { validateName, validateText };
