function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const TypeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.outStr = '';
  this.i = 0
  this.type();
}

// Type Method
TypeWriter.prototype.typeOld = function() {
  const current = this.wordIndex % this.words.length;
  const fullTxt = this.words[current];
  console.log(this.txt);
  let typeSpeed = 300;
  // Check if deleting
  if (this.isDeleting) {
    // Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    typeSpeed = 500;
  } else {
    // Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  
  // Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
  // Initial type speed
  typeSpeed = 300;
  if(this.isDeleting) {
    typeSpeed /= 2;
  }
  
  // Is word complete?
  if (!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === fullTxt) {
    this.isDeleting = false;
    this.wordIndex++;
    typeSpeed = 500;
  }
  
  setTimeout(() => this.type(), typeSpeed);
}

TypeWriter.prototype.type = function() {
  const fullTxt = this.words[0];
  const latestChar = fullTxt.charAt(this.i);
  let typeSpeed = getRandomInt(100, 500);
  
  this.txtElement.innerHTML = `<span class="txt">${this.outStr}</span>`;
  
  if (latestChar === " ") {
    typeSpeed *= 3;
  } else {
    this.outStr += latestChar
  }
  this.i++;

  setTimeout(() => {this.type()}, typeSpeed);
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init app
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  
  new TypeWriter(txtElement, words, wait);
}