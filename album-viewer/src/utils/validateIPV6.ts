/**
 * Validate an IPv6 address string.
 * Accepts full, compressed, and IPv4-embedded forms.
 * Returns true for valid IPv6 addresses, false otherwise.
 */
function validateIPv4(ip: string): boolean {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  for (const p of parts) {
    if (!/^[0-9]+$/.test(p)) return false;
    const n = Number(p);
    if (n < 0 || n > 255) return false;
    if (p.length > 1 && p[0] === '0') {
      // allow leading zeroes but still numeric; don't reject here
    }
  }
  return true;
}

export function validateIPV6(input: string): boolean {
  if (!input || typeof input !== 'string') return false;
  const s = input.trim();

  // If the address contains an embedded IPv4, validate IPv4 part and IPv6 hextets separately
  if (s.indexOf('.') !== -1) {
    const lastColon = s.lastIndexOf(':');
    if (lastColon === -1) return false;
    const ipv4Part = s.slice(lastColon + 1);
    if (!validateIPv4(ipv4Part)) return false;

    const head = s.slice(0, lastColon);

    // Validate the head as IPv6 hextets with optional :: compression, accounting for IPv4 taking 2 hextets
    const parts = head.split('::');
    if (parts.length > 2) return false;

    const countHextets = (p: string) => (p.length === 0 ? 0 : p.split(':').filter(Boolean).length);

    const leftCount = countHextets(parts[0] ?? '');
    const rightCount = parts.length === 2 ? countHextets(parts[1]) : 0;

    // IPv4 occupies 2 hextets, so total hextets must be <= 6
    if (leftCount + rightCount > 6) return false;

    const hextetRe = /^[0-9A-Fa-f]{1,4}$/;
    for (const seg of (parts[0] ? parts[0].split(':').filter(Boolean) : [])) {
      if (!hextetRe.test(seg)) return false;
    }
    if (parts.length === 2) {
      for (const seg of (parts[1] ? parts[1].split(':').filter(Boolean) : [])) {
        if (!hextetRe.test(seg)) return false;
      }
    }

    return true;
  }

  // Compact IPv6 regex covering full and compressed forms (no embedded IPv4)
  const finalRe = /^((?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){1,7}:)|(?:(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4})|(?:(?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2})|(?:(?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3})|(?:(?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4})|(?:(?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5})|(?:[0-9A-Fa-f]{1,4}:(?:(?::[0-9A-Fa-f]{1,4}){1,6}))|(?:::(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4}))$/i;

  return finalRe.test(s);
}

export default validateIPV6;
