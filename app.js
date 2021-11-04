'use strict';

// Global variables.
const results = document.querySelector('ul');
const viewResults = document.querySelector('button');

let productArray = [];
let randomNumberArray = []; // Use to store the numbers to populate and check against.
let numberOfRoundsForSelections = 25;
let img1 = document.querySelector('section img:first-child');
let img2 = document.querySelector('section img:nth-child(2)');
let img3 = document.querySelector('section img:last-child');
let currentSelectionRound = 0;

//Constructor function for products.
function Product(productName, fileExtension = 'jpg') {
  this.productName = productName;
  this.filePathOfImage = `imgs/${productName}.${fileExtension}`;
  this.timesShown = 0;
  this.timesSelected = 0;

  productArray.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

function randomNumber() {
  return Math.floor(Math.random() * productArray.length); // only return the value, not a variable.
}

function renderProducts() {
  for(let i = 0; i < 3; i++) {
    let newNumber = randomNumber();
    while(randomNumberArray.includes(newNumber)){
      newNumber = randomNumber();
    }
    randomNumberArray.push(newNumber);
  }

  while(randomNumberArray.length < 6) {
    let newSetNumber = randomNumber();
    if(!randomNumberArray.includes(newSetNumber)){
      randomNumberArray.push(newSetNumber);
    }
  }

  img1.src = productArray[randomNumberArray[0]].filePathOfImage;
  img2.src = productArray[randomNumberArray[1]].filePathOfImage;
  img3.src = productArray[randomNumberArray[2]].filePathOfImage;

  productArray[randomNumberArray[0]].timesShown++;
  productArray[randomNumberArray[1]].timesShown++;
  productArray[randomNumberArray[2]].timesShown++;

  for(let i = 0; i < 3; i++){
    randomNumberArray.shift();
  }

}

function renderTimesShown() {
  for (let i = 0; i < productArray.length; i++){
    let li = document.createElement('li');
    li.textContent = `${productArray[i].productName}: ${productArray[i].timesShown} view(s), ${productArray[i].timesSelected} time(s) selected.`;
    results.appendChild(li);
  }
}

function handleClick(event) {

  if(currentSelectionRound < numberOfRoundsForSelections) {

    // Declare variable to be assigned event.target.
    let itemSelected = event.target;

    // For a single selection round, add one to the count of the product selected.
    for(let i = 0; i < productArray.length; i++){
      // if itemSelect.src ends with same filename, do the addition to the timesSelected.
      /* endsWith returns a boolean value.  Must do comparison to True instead of productArray[i].filePathOfImage.  If statement always checks if something is true.  No need to be redundant. */
      if(itemSelected.src.endsWith(productArray[i].filePathOfImage)){
        productArray[i].timesSelected++;
      }
    }

    // Change the images to select from.
    renderProducts();
  }

  currentSelectionRound++;
}

function handleButton(event) {
  // Add one to the counter for the number of selection rounds.
  numberOfRoundsForSelections++;

  // Clear out each previous render.
  while(results.firstChild){
    results.removeChild(results.firstChild);
  }

  // Render number of times product was selected.
  renderTimesShown();

}

img1.addEventListener('click', handleClick);
img2.addEventListener('click', handleClick);
img3.addEventListener('click', handleClick);

viewResults.addEventListener('click', handleButton);

renderProducts();
