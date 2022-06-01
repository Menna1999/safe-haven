const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const hour = date.getHours();

const newDate = new Date();
newDate.setFullYear(year);
newDate.setMonth(month);
newDate.setDate(day);
newDate.setHours(hour+1);
console.log(date);
console.log(newDate);