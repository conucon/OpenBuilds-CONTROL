var lang = "de"; // TBD: Use global setting
var tr;

$(document).ready(function() {

    // Read lang.json
    const trFile = "http://localhost:3000/translation/" + lang + ".json";

    $.ajax({
      url: trFile,
      dataType: "text",
      async: false,
      success: (data) => {
        tr = JSON.parse(data)
        // Detect html-element and substitute innerHTML with translation
        for (const [key, value] of Object.entries(tr)) {
            jqKey = "#" + key;
            $(jqKey).text(value);
        }
      },
      error: function (xhr, status, error) {
        alert("Translation file error.");
    },
    });
  }
)