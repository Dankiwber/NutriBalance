const response = [
  {
    name: "apple",
    intake: "5 units",
    calories: "325 cal",
    fat: "1 g",
    carbs: "86 g",
    protein: "1.5 g",
  },
  {
    name: "bread",
    intake: "150 g",
    calories: "390 cal",
    fat: "4.5 g",
    carbs: "72 g",
    protein: "12 g",
  },
  {
    name: "cola",
    intake: "1 can (330 ml)",
    calories: "139 cal",
    fat: "0 g",
    carbs: "35 g",
    protein: "0 g",
  },
];
let food_arr = new Map();
const intake_arr = [];
response.forEach((food) => {
  food_arr.set(food.name, food.intake);
});
console.log(food_arr);
for (let [key, value] of food_arr) {
  console.log(key + " is " + value);
}
