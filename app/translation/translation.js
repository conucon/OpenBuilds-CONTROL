var langEN;
var langData;
// Function to load the language settings file
async function loadLanguageSettings() {
  try {
    const response = await fetch('http://localhost:3000/translation/translation.json');
    const languageSettings = await response.json();
    return languageSettings;
  } catch (error) {
    console.error('Error loading language settings:', error);
    return null;
  }
}

function tr(key) {
  let foundKey = ""
  if (langData[key]) {
    foundKey = key;
  } else {
    foundKey = Object.keys(langEN.data).find(iKey => langEN.data[iKey] === key);
  }
  console.log(key, foundKey, Object.values(langData))
  return langData.data[foundKey];

}
  // Function to load a language file
async function loadLanguageFile(settings, filename) {
  try {
    const response = await fetch(`http://localhost:3000/translation/${filename}`);
    const languageData = await response.json();
    let settingKey = Object.keys(settings).find(iKey => settings[iKey].filename === filename);
    settings[settingKey].data = languageData;
    return languageData;
  } catch (error) {
    console.error(`Error loading language file ${filename}:`, error);
    return null;
  }
}

Promise.all([loadLanguageSettings()])
  .then(([languageSettings]) => {
    if (languageSettings) {
      // Language settings loaded successfully
      console.log(languageSettings);

      // Assuming the language settings file is stored as `settings.json`
      const languageFiles = Object.values(languageSettings).map((language) => {
        return language.filename;
      });

      console.log('Language files:', languageFiles);

      // Load the content of each language file into an array
      const languagePromises = languageFiles.map((filename) => {
        return loadLanguageFile(languageSettings, filename);
      });

      Promise.all(languagePromises)
        .then((languageDataArray) => {
            // Language data loaded successfully
          console.log('Language data array:', languageDataArray);

          // Get the card-content element
          const cardContent = document.querySelector('#languageSettingsCard .card-content');

          // Function to translate the HTML elements
          function translateElements(languageData) {
            Object.entries(languageData).forEach(([key, value]) => {
              $("#"+key).text(languageData[key]);
            });
          }

          // Populate the available languages in the card-content
          Object.entries(languageSettings).forEach((languageArray, index) => {
            let language = languageArray[1];
            const languageOption = document.createElement('div');
            languageOption.classList.add('language-option');
            languageOption.textContent = language.name;

            if (language.name == "English") langEN = language;
            langData = langEN;
            
            if (language.default) {
              languageOption.classList.add('selected');
              translateElements(language.data);
            }
            
            languageOption.addEventListener('click', () => {

              // Change the selected language and update the translation
              cardContent.querySelectorAll('.language-option').forEach((option) => {
                option.classList.remove('selected');
              });
              languageOption.classList.add('selected');
              langData = language;
              translateElements(language.data);
            });

            cardContent.appendChild(languageOption);
          });
        })
        .catch((error) => {
          console.error('Error loading language files:', error);
        });
    } else {
      // Failed to load language settings
      console.log('Language settings not found.');
    }
  });