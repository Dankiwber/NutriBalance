# **NutriBalance Web App**

**NutriBalance** is a food tracking application designed to help users log their daily food intake, calculate nutritional information, and manage their health goals. This web app is built using **React Native for Web** to deliver a seamless and responsive user experience across devices.

## How to Run the App on Your Phone

Follow these steps to run the app on your phone:

### 1. Ensure Expo is Installed

Make sure `expo` is installed in your project. Run the following command:

```
npm install expo
```

If you prefer Yarn, use:

```
yarn add expo
```

### 2. Install Necessary Dependencies

To ensure all required dependencies are installed, run:

```
npm install
```

Or, if you are using Yarn:

```
yarn install
```

### 3. Start the Project

Once the installation is complete, start your project with:

```
	npx expo start
```

### 4. Install Expo Go on Your Phone

- Download the **Expo Go** app from the [App Store](https://apps.apple.com/) (iOS) or [Google Play Store](https://play.google.com/) (Android).
- Open the Expo Go app on your phone.

### 5. Connect to the Project

- After running `npx expo start`, a QR code will appear in your terminal or browser.
- Scan the QR code using the **Expo Go** app on your phone.
- The app will load and run on your device.

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
