async function fetchData() {
    const response = await fetch("https://api.waqi.info/feed/nagpur/?token=e53ae75c23b11dbb01365576f772233cfd9e6442")
    const record = await response.json();

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

fetchData();