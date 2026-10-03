# 🌤️ Modern Weather App

A professional and responsive **Weather Application** built with **React, JavaScript, HTML (JSX), and CSS**.

The application allows users to search for any city and view its current weather conditions, temperature, humidity, wind speed, and a 5-day forecast using the **Open-Meteo API**.

---

## ✨ Features

* 🔍 Search weather by city name
* 🌡️ Current temperature in Celsius
* 🌤️ Weather condition with weather icon
* 💧 Relative humidity
* 💨 Wind speed
* 📈 Today's minimum and maximum temperature
* 📅 5-day weather forecast
* ⏳ Loading state while fetching data
* ❌ Error handling for invalid cities and API failures
* 📱 Fully responsive design
* 🎨 Modern and clean user interface
* ⚡ Fast performance with React and Vite

---

## 🛠️ Technologies Used

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| ⚛️ React          | User interface and components |
| 🟨 JavaScript     | Application logic             |
| 🎨 CSS            | Styling and responsive design |
| 🌐 Open-Meteo API | Weather data                  |
| ⚡ Vite            | Development and build tool    |
| 📦 npm            | Package management            |

---

## 📂 Project Structure

```text
weather-app/
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── Weather.jsx
│   ├── Weather.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/weather-app.git
```

### 2. Open the Project

```bash
cd weather-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will run on a local development URL such as:

```text
http://localhost:5173
```

---

## 🌐 Weather API

This project uses **Open-Meteo** to retrieve weather information.

Open-Meteo provides weather forecast and geocoding services without requiring an API key for normal usage.

### APIs Used

**Geocoding API**

Used to convert a city name into latitude and longitude.

**Forecast API**

Used to retrieve:

* Current temperature
* Weather condition
* Humidity
* Wind speed
* Minimum temperature
* Maximum temperature
* Daily forecast

---

## 🔄 How It Works

```text
User enters city
        ↓
Search button clicked
        ↓
Geocoding API
        ↓
Latitude + Longitude
        ↓
Weather API
        ↓
Weather data received
        ↓
React updates the UI
        ↓
Weather information displayed
```

---

## ⚠️ Error Handling

The application handles common errors such as:

* Empty city search
* Invalid city name
* City not found
* Network errors
* API request failures
* Missing weather data

Users receive a clear message instead of seeing broken or fake weather information.

---

## 📱 Responsive Design

The application is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

The layout automatically adjusts according to the screen size.

---

## 🎨 UI Design

The application uses a modern weather dashboard design with:

* Blue gradient background
* Glass-style weather cards
* Rounded corners
* Weather icons
* Clear typography
* Responsive forecast cards
* Smooth hover effects

---

## 📸 Screenshots

Add screenshots of your application here:

```text
screenshots/
├── desktop.png
└── mobile.png
```

Example:

```md
![Weather App Desktop](screenshots/desktop.png)

![Weather App Mobile](screenshots/mobile.png)
```

---

## 📦 Available Scripts

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🔮 Future Improvements

Possible future features:

* 🌙 Dark mode
* 📍 Use current location
* ⭐ Favorite cities
* 🌡️ Fahrenheit/Celsius switch
* ⏰ Hourly forecast
* 🌅 Sunrise and sunset information
* 🌧️ Animated weather backgrounds
* 📊 Weather charts
* 🔔 Weather alerts

---

## 🤝 Contributing

Contributions are welcome.

To contribute:

```bash
git fork
```

Create a new branch:

```bash
git checkout -b feature/new-feature
```

Make your changes and commit:

```bash
git add .
git commit -m "Add new feature"
```

Push your branch:

```bash
git push origin feature/new-feature
```

Then open a Pull Request.

---

## 📄 License

This project is created for learning and development purposes.

---

## 👨‍💻 Author

**Abubakar Syed Najam**

Built with ❤️ using React and JavaScript.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
it