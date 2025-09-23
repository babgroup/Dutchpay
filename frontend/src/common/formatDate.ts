export const formatDate = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());

  return `${mm}월 ${dd}일 ${hh}:${min}`;
};