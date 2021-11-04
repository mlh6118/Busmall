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

  // Generate the initial set of random numbers.
  for(let i = 0; i < 3; i++) {
    let newNumber = randomNumber();
    while(randomNumberArray.includes(newNumber)){  // Verify numbers are not already being used in set of numbers.
      newNumber = randomNumber();
    }
    randomNumberArray.push(newNumber);
  }

  // Generate the replacement set of random numbers.
  while(randomNumberArray.length < 6) {
    let newSetNumber = randomNumber();
    if(!randomNumberArray.includes(newSetNumber)){  // Verify numbers are not part of previous set of numbers.
      randomNumberArray.push(newSetNumber);
    }
  }

  img1.src = productArray[randomNumberArray[0]].filePathOfImage;
  img2.src = productArray[randomNumberArray[1]].filePathOfImage;
  img3.src = productArray[randomNumberArray[2]].filePathOfImage;

  productArray[randomNumberArray[0]].timesShown++;
  productArray[randomNumberArray[1]].timesShown++;
  productArray[randomNumberArray[2]].timesShown++;

  // Remove first three values of randomNumberArray to prepare for next set of numbers.
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
  // renderTimesShown();
  chartTotalResults();
}

function chartTotalResults(){
  let arrayOfProducts = [];
  let arrayOfTimesShown = [];
  let arrayOfTimesSelected = [];

  // Put all data from productArray[] into chart data arrays.
  for(let i = 0; i < productArray.length; i++){
    arrayOfProducts.push(productArray[i].productName);
    arrayOfTimesShown.push(productArray[i].timesShown);
    arrayOfTimesSelected.push(productArray[i].timesSelected);
  }

  // Set up data for the chart.  Cannot use productArray[] directly here.
  const data = {
    labels: arrayOfProducts,
    datasets: [
      {
        label: 'Viewed',
        backgroundColor: 'rgb(150, 2, 2)',
        borderColor: 'rgb(150, 2, 2)',
        data: arrayOfTimesShown,
      },
      {
        label: 'Selected',
        backgroundColor: 'rgb(2, 83, 150)',
        borderColor: 'rgb(2, 83, 150)',
        data: arrayOfTimesSelected,
      },
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  let resultsChart = document.getElementById('chartResults');
  const chartResults = new Chart(resultsChart,config);
}


img1.addEventListener('click', handleClick);
img2.addEventListener('click', handleClick);
img3.addEventListener('click', handleClick);

viewResults.addEventListener('click', handleButton);

renderProducts();
