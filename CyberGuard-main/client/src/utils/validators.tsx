/**
 * Validates an email address
 * @param email - The email to validate
 * @returns boolean - True if email is valid
 */
export const validateEmail = (email: string): boolean => {
  // Regular expression for basic email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validates a password meets minimum requirements
 * @param password - The password to validate
 * @returns boolean - True if password is valid
 */
export const validatePassword = (password: string): boolean => {
  // At least 6 characters
  return password.length >= 6;
};

/**
 * Validates a username meets requirements
 * @param username - The username to validate
 * @returns boolean - True if username is valid
 */
export const validateUsername = (username: string): boolean => {
  // Between 3 and 20 characters (letters, numbers, underscores)
  const re = /^[a-zA-Z0-9_]{3,20}$/;
  return re.test(username);
};

/**
 * Validates that two passwords match
 * @param password - First password
 * @param confirmPassword - Second password to compare
 * @returns boolean - True if passwords match
 */
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

/**
 * Gets password strength score (0-4)
 * @param password - The password to evaluate
 * @returns number - Strength score (0=weak, 4=strong)
 */
export const getPasswordStrength = (password: string): number => {
  let score = 0;

  // Length requirement
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Contains numbers
  if (/\d/.test(password)) score++;

  // Contains special chars
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  // Contains both lowercase and uppercase
  if (/(?=.[a-z])(?=.[A-Z])/.test(password)) score++;

  return Math.min(score, 4);
};

/**
 * Validates a name (for first/last names)
 * @param name - The name to validate
 * @returns boolean - True if name is valid
 */
export const validateName = (name: string): boolean => {
  // Between 2 and 50 characters, letters, hyphens, apostrophes
  const re = /^[a-zA-Z'-]{2,50}$/;
  return re.test(name);
};
