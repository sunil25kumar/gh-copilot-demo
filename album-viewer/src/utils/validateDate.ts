/**
 * Parse and validate a French-format date string and return a Date.
 * Accepts formats: `dd/mm/yyyy`, `d/m/yy`, `dd-mm-yyyy`, `dd.mm.yy`, and space-separated variants.
 * Returns a Date object on success, or `null` if the input is invalid.
 */
export function validateDate(input: string): Date | null {
  if (!input || typeof input !== 'string') return null;
  const s = input.trim();
  // Accept separators: / - . or space
  const m = s.match(/^(\d{1,2})[\/\-. ](\d{1,2})[\/\-. ](\d{2,4})$/);
  if (!m) return null;
  let day = parseInt(m[1], 10);
  let month = parseInt(m[2], 10);
  let year = parseInt(m[3], 10);

  // Normalize 2-digit years: 00-49 => 2000-2049, 50-99 => 1950-1999
  if (year < 100) {
    year = year >= 50 ? 1900 + year : 2000 + year;
  }

  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;

  const date = new Date(year, month - 1, day);
  // Validate that Date normalized values match inputs (catches invalid days like 31/02)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export default validateDate;
