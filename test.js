const date = new Date();
let day = String(date.getDate()).padStart(2, "0"); // 确保日期是两位数
let month = String(date.getMonth() + 1).padStart(2, "0"); // 确保月份是两位数
let year = date.getFullYear();
let hour = String(date.getHours() + 1).padStart(2, "0");
let minutes = String(date.getMinutes() + 1).padStart(2, "0");
let second = String(date.getSeconds() + 1).padStart(2, "0");
let currentDate = `${year}-${month}-${day} ${hour}:${minutes}:${second}`;
console.log(currentDate); // 例如 "2022-06-17"

const obj = {
  "2025-02-02": "2300",
  "2025-02-03": "1900",
  "2025-02-04": "2500",
  "2025-02-05": "1800",
  "2025-02-06": "2600",
  "2025-02-07": "2000",
  "2025-02-08": "2500",
};

console.log(obj[currentDate.split(" ")[0]]);
