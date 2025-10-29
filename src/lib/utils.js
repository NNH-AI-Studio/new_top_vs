export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncate(text, length = 150) {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}
