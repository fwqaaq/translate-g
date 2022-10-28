/** @format */

fetch('https://translate.google.com')
  .then((response) => response.text())
  .then((text) => console.log(text))
