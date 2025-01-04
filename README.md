# **NutriBalance Web App**

**NutriBalance** is a food tracking application designed to help users log their daily food intake, calculate nutritional information, and manage their health goals. This web app is built using **React Native for Web** to deliver a seamless and responsive user experience across devices.

---

## **Features**

- **Food Logging** : Add food items along with their quantity and meal type (e.g., breakfast, lunch, dinner).
- **Nutritional Analysis** : Automatically calculate calories, protein, carbs, and fat using an integrated nutrition API.
- **Meal History** : View and manage your logged meals for each day.
- **Personalized Recommendations** : Receive tips for balancing your nutrition based on daily intake.
- **Responsive Design** : Optimized for both desktop and mobile browsers.

---

## **Tech Stack**

- **Frontend** : React Native for Web, TypeScript (or JavaScript)
- **State Management** : React Context API (or alternative state management tool like Zustand/Redux)
- **Styling** : Styled Components/Material-UI for consistent and modern UI
- **Backend** : Django REST Framework (for API support)
- **Database** : PostgreSQL (for user and food log data)

---

## **Key Components**

### **1. Food Logging**

- Input food name and quantity.
- Select meal type (Breakfast, Lunch, Dinner).

### **2. Nutritional Analysis**

- Uses **USDA FoodData Central API** for accurate nutritional data.
- Displays the breakdown of calories, protein, carbs, and fats.

### **3. Meal History**

- View previously logged meals with timestamps.
- Edit or delete food entries as needed.

### **4. Recommendations**

- Provides actionable suggestions for improving daily nutritional balance.
