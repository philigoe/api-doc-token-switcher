var headerElements = document.querySelectorAll("fieldset.headers");

for(var i = 0; i < headerElements.length; i++) {
  var retrievedValueInputs = headerElements[i].querySelectorAll("input[placeholder=\'Value\']");

  if(retrievedValueInputs.length > 0) {
    retrievedValueInputs[0].value="";
  }

  var retrievedKeyInputs = headerElements[i].querySelectorAll("input[placeholder=\'Key\']");

  if(retrievedKeyInputs.length > 0) {
    retrievedKeyInputs[0].value="";
  }
}
