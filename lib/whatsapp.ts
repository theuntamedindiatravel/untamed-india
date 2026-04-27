function digitsOnly(value: string) {
  return value.replace(/\D/g, '');
}

export function getWhatsAppNumberE164Digits() {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91 9929867924';
  const digits = digitsOnly(raw);
  return digits;
}

export function getWhatsAppLink(message?: string) {
  const digits = getWhatsAppNumberE164Digits();
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

