export default function getDateString(_date: Date | null): string {
    if (_date === null) return "None";
    const date = new Date(_date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${year}-${month}-${day}-${hour}-${minute}`;
}
