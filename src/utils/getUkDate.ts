export default function getUkDate(date: string) {
  const newDate = new Date(date);

  if (!newDate) {
    return;
  }

  return `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`;
}
