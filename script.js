async function fetchData(position) {

    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `Latitude: ${lat}, Longitude: ${long}`;

    const url = `https://api.waqi.info/feed/here?token=e53ae75c23b11dbb01365576f772233cfd9e6442`;
    console.log(url)

    const response = await fetch(url)
    const record = await response.json();
    console.log(record)

    document.getElementById("date-text").innerHTML = record.data['time']['s'].split(" ")[0];
    document.getElementById("city-text").innerHTML = record.data['city']['name'].split(",")[1];
    document.getElementById("aqi-label").innerHTML = record.data['aqi'];
    document.getElementById("co-label").innerHTML = record.data['iaqi']['co']['v'];
    document.getElementById("o3-label").innerHTML = record.data['iaqi']['o3']['v'];
    document.getElementById("no2-label").innerHTML = record.data['iaqi']['no2']['v'];
    document.getElementById("so2-label").innerHTML = record.data['iaqi']['so2']['v'];
    document.getElementById("pm25-label").innerHTML = record.data['iaqi']['pm25']['v'];
    document.getElementById("pm10-label").innerHTML = record.data['iaqi']['pm10']['v'];

    const aqiValue = record.data['aqi'];
    document.getElementById("aqi-label").innerHTML = aqiValue;

    const iconElement = document.createElement("i");
    const aqiLabelElement = document.getElementById("aqi-label");

    if (aqiValue > 100) {
        iconElement.className = "fas fa-exclamation-triangle";
        iconElement.style.color = "red";
        aqiLabelElement.style.color = "red";
    } else {
        iconElement.className = "fas fa-tree";
        iconElement.style.color = "green";
        aqiLabelElement.style.color = "green";
    }

    const spaceElement = document.createTextNode("\u00a0");

    document.getElementById("aqi").appendChild(spaceElement);
    document.getElementById("aqi").appendChild(iconElement);

}

// Function to handle errors when retrieving location
function errorCallback(error) {
    const resultDiv = document.getElementById("result");
    if (error.code === error.PERMISSION_DENIED) {
        resultDiv.textContent = "Geolocation permission denied. Please allow access in your browser settings.";
        // You can also provide instructions for enabling geolocation in the browser settings.
        const instructionsDiv = document.getElementById("instructions");
        instructionsDiv.textContent = "To enable geolocation access, go to your browser settings, find 'Site Settings' or 'Privacy and Security', and allow location access for this extension.";
    } else {
        resultDiv.textContent = "Error getting location: " + error.message;
    }
}

// Check if geolocation is available in the browser
if ("geolocation" in navigator) {
    // Request the user's location
    navigator.geolocation.getCurrentPosition(fetchData, errorCallback);
} else {
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = "Geolocation is not available in this browser.";
}
