document.getElementById("temperature-input").addEventListener('keyup', () => updateResult());
document.getElementById("unit-select").addEventListener('change', () => updateResult());

updateResult()

function convertTemperature(value, unit) {
      if (unit === "Fahrenheit") {
          return (value - 32) * 5 / 9;
      } else if (unit === "Celsius") {
          return value * 9 / 5 + 32;
      }
}
  
function updateResult() {
      const temperature = parseFloat(document.getElementById("temperature-input").value);
      const unit = document.getElementById("unit-select").value;
      const convertedUnit = unit === "Fahrenheit" ? "°C" : "°F";
      if (isNaN(temperature)) {
            document.getElementById("result").innerHTML = `Невозможно преобразовать ${temperature} в ${convertedUnit}`;
      } else {
            const convertedTemperature = convertTemperature(temperature, unit);  
            document.getElementById("result").innerHTML = ` = ${convertedTemperature.toFixed(2)} ${convertedUnit}`;
      }
}
