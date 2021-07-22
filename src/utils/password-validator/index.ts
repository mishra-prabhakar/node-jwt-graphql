export interface PasswordOptions {
  minLength?: number;
  digits?: boolean;
  letters?: boolean;
}

export interface ValidationObject {
  valid: boolean;
  errors: string[];
}

export const RULES = {
  MIN_LENGTH: "MIN_LENGTH",
  DIGITS: "DIGITS",
  LETTERS: "LETTERS",
};

function hasDigits(password: string) {
  return /\d+/.test(password);
}

function hasLetters(password: string) {
  return /[a-zA-Z]+/.test(password);
}

export default function validate(
  password: string,
  options: PasswordOptions = {}
): ValidationObject {
  const errors = [];
  const minLength = options.minLength || 8;
  const letters = options.letters === undefined ? true : options.letters;
  const digits = options.digits;

  if (minLength < 8) {
    throw new RangeError("Password should be of min length 8");
  }
  if (password.length < minLength) {
    errors.push(RULES.MIN_LENGTH);
  }
  if (digits && !hasDigits(password)) {
    errors.push(RULES.DIGITS);
  }
  if (letters && !hasLetters(password)) {
    errors.push(RULES.LETTERS);
  }

  return {
    valid: !errors.length,
    errors,
  };
}
