var toDE = Object(), toEN = Object();
toDE["portConnected"] = "Verbunden";
toEN["portConnected"] = "Port: Connected";
toDE["mmMode"] = "mm-Mode";
toEN["mmMode"] = "mm-mode";
toDE["runSimBtn"] = "Simulieren";
toEN["runSimBtn"] = "simulate";
toDE["portConnected"] = "Verbunden";
toEN["portConnected"] = "Port: Connected";
toDE["notConnected"] = "Nicht Verbunden";
toEN["notConnected"] = "Not Connected";
toDE["doorSensor"] = "Tür Sensor";
toEN["doorSensor"] = "Door Sensor";

var tr = toDE;

$(document).ready(function() {
    for (const [key, value] of Object.entries(tr)) {
        jqKey = "#" + key;
        $(jqKey).text(value);
    }
  }
)