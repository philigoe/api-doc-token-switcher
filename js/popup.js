/**
* Main javascript logic.
*
*/

/**
 * Get the current URL. Function provided by Google Chrome extension documents
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

/**
* Function to render error text
*
* @param statusText error text to display
*/
function renderStatus(statusText) {
  document.getElementById('main-view').textContent = statusText;
}

// Called whenever the user clicks on the icon
document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    // Check to see if our url contains /api/doc, which is the default
    if(url.indexOf('api/doc') > -1) {

    } else {
      renderStatus("Error: URL doesn't contain /api/doc");
    }
  });

  textFieldWatch("nameOne");
  textFieldWatch("tokenOne");
  textFieldWatch("nameTwo");
  textFieldWatch("tokenTwo");
  textFieldWatch("nameThree");
  textFieldWatch("tokenThree");
  textFieldWatch("nameFour");
  textFieldWatch("tokenFour");
  textFieldWatch("nameFive");
  textFieldWatch("tokenFive");

  var checkBoxes = ["checkboxOne", "checkboxTwo", "checkboxThree", "checkboxFour", "checkboxFive"];

  // Check the last checked check box, if any
  var lastChecked = localStorage.getItem("checkedBox");
  if(lastChecked) {
    $("#"+lastChecked).prop("checked", true);
    updateOAuthTokensInDOM(lastChecked);
  }

  // Now set up the watchers for all the checkboxes
  for(var i = 0; i < checkBoxes.length; i++) {
    checkboxWatch(checkBoxes[i], checkBoxes);
  }

  // Setup the clear button listener
  clearButtonListener();
});

/**
* Watches the passed text field; will restore previously stored local storage values, and will persist new changes to local storage
*
* @param name name of the text field to watch
*/
function textFieldWatch(name) {
  $("#"+name).val(localStorage.getItem(name));
  $("#"+name).on('input', function() {
    localStorage.setItem(name, $("#"+name).val());
    // Test to see if the checkbox for this field is checked
    var correspondingCheckbox = "checkbox"+name.replace('token','');
    if($("#"+correspondingCheckbox).prop("checked")) {
      updateOAuthTokensInDOM(correspondingCheckbox);
    }
  });
}

/**
* Unchecks all textboxes
*
* @param checkboxes string array of all checkbox names to uncheck
*/
function uncheckAllBoxes(checkboxes) {
  for(var i = 0; i < checkboxes.length; i++) {
    $("#"+checkboxes[i]).prop("checked", false);
  }
}

/**
* Watches the checkbox for changes - takes care of unchecking the current checked box
*
* @param checkBox checkBox to watch
* @param checkboxes string array of all checkbox names
*/
function checkboxWatch(checkBox, checkBoxes) {
  $("#"+checkBox).change(function() {
    uncheckAllBoxes(checkBoxes);
    localStorage.setItem("checkedBox", checkBox);
    $("#"+checkBox).prop("checked", true);
    updateOAuthTokensInDOM(checkBox);
  });
}

/**
* Updates the passed auth token to all endpoints
*
* @param checkbox name of the checkbox that was checked
*/
function updateOAuthTokensInDOM(checkbox) {
  var tokenInput = $("#token"+checkbox.replace('checkbox',''));
  var token = tokenInput.val();

  chrome.tabs.executeScript({
    code: 'var headerElements = document.querySelectorAll("fieldset.headers"); for(var i = 0; i < headerElements.length; i++) { var retrievedValueInputs = headerElements[i].querySelectorAll("input[placeholder=\'Value\']"); if(retrievedValueInputs.length > 0) { retrievedValueInputs[0].value="Bearer '+token+'"; } var retrievedKeyInputs = headerElements[i].querySelectorAll("input[placeholder=\'Key\']"); if(retrievedKeyInputs.length > 0) { retrievedKeyInputs[0].value="Authorization"; } }'
  });
}

function clearButtonListener() {
  $("#clearButton").click(function(e) {
    chrome.tabs.executeScript({
      code: 'var headerElements = document.querySelectorAll("fieldset.headers"); for(var i = 0; i < headerElements.length; i++) { var retrievedValueInputs = headerElements[i].querySelectorAll("input[placeholder=\'Value\']"); if(retrievedValueInputs.length > 0) { retrievedValueInputs[0].value=""; } var retrievedKeyInputs = headerElements[i].querySelectorAll("input[placeholder=\'Key\']"); if(retrievedKeyInputs.length > 0) { retrievedKeyInputs[0].value=""; } }'
    });
  });
}
