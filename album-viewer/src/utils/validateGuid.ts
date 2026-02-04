/**
 * Validate a GUID/UUID string.
 * Accepts the common formats:
 * - "N" (32 digits): 00000000000000000000000000000000
 * - "D" (hyphenated): 00000000-0000-0000-0000-000000000000
 * - "B" (braced): {00000000-0000-0000-0000-000000000000}
 * - "P" (parentheses): (00000000-0000-0000-0000-000000000000)
 *
 * Returns `true` if the input matches one of these formats, otherwise `false`.
 */
export function validateGuid(input: string): boolean {
  if (!input || typeof input !== 'string') return false;
  const s = input.trim();

  const pattern = /^(?:[0-9a-fA-F]{32}|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}|\{[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}|\([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\))$/;

  return pattern.test(s);
}

export default validateGuid;
