'use strict';

// Global variables.
const results = document.querySelector('ul');
let productArray = [];
let numberOfRoundsForSelections = 0;
let img1 = document.querySelector('section img:first-child');
let img2 = document.querySelector('section img:nth-child(2)');
let img3 = document.querySelector('section img:last-child');

// console.log(img1 + ' ' + img2 + ' ' + img3);

//Constructor function for products.
function Product(productName, fileExtension = 'jpg') {
  this.productName = productName;
  this.filePathOfImage = `imgs/${productName}.${fileExtension}`;
  this.timesShown = 0;
  this.timesSelected = 0;

  productArray.push(this);
}

new Product('bag');
new Product('sweep', 'png');
new Product('cthulhu');
new Product('dragon');

function randomNumber() {
  return Math.floor(Math.random() * productArray.length); // only return the value, not a variable.
}

function renderProducts() {
  let product1 = randomNumber();
  let product2 = randomNumber();
  let product3 = randomNumber();

  while (product1 === product2 || product1 === product3 || product2 === product3){
    product1 = randomNumber();
    product2 = randomNumber();
    product3 = randomNumber();
  }

  img1.src = productArray[product1].filePathOfImage;
  img2.src = productArray[product2].filePathOfImage;
  img3.src = productArray[product3].filePathOfImage;

  productArray[product1].timesShown++;
  productArray[product2].timesShown++;
  productArray[product3].timesShown++;
}

function renderTimesShown() {
  for (let i = 0; i < productArray.length; i++){
    let li = document.createElement('li');
    li.textContent = `${productArray[i].productName}: ${productArray[i].timesShown} view(s), ${productArray[i].timesSelected} time(s) selected.`;
    results.appendChild(li);
  }
}

function handleClick(event) {
  // alert('You are in the handleClick event.');

  // Declare variable to be assigned event.target.
  let itemSelected = event.target;

  // For a single selection round, add one to the count of the product selected.
  for(let i = 0; i < productArray.length; i++){
    // if itemSelect.src ends with same filename, do the addition to the timesSelected.
    /* endsWith returns a boolean value.  Must do comparison to True instead of productArray[i].filePathOfImage.  If statement always checks if something is true.  No need to be redundant. */
    // if(itemSelected.src.endsWith(productArray[i].filePathOfImage) === productArray[i].filePathOfImage){
    if(itemSelected.src.endsWith(productArray[i].filePathOfImage)){
      productArray[i].timesSelected++;
    }
  }

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

renderProducts();
// renderTimesShown();
