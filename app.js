'use strict';

let leftImg = document.getElementById('left');
let middleImg = document.getElementById('middle');
let rightImg = document.getElementById('right');
let result = document.getElementById('result');
let showResults = document.getElementById('showResults');

let productImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg','breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let products = [];

let attempt = 1;
let maxAttemps = 25;

function ProductImage(productName){
    this.PName = productName.split('.')[0];
    this.PImage = `img/${productName}`;
    this.views = 0;
    this.votes = 0;
    products.push(this);

}

for(let i = 0; i < productImages.length; i++){
    new ProductImage(productImages[i]);
}

function randomImage(){
    return Math.floor(Math.random() * productImages.length);
}


let indexLeft;
let indexMiddle;
let indexRight;

function renderImg(){
    indexLeft = randomImage();
    indexMiddle = randomImage();
    indexRight = randomImage();

    while(indexLeft == indexMiddle || indexLeft == indexRight || indexRight == indexMiddle ){

        indexLeft = randomImage();
        indexRight = randomImage();
    }

    leftImg.setAttribute('src', products[indexLeft].PImage );

    middleImg.setAttribute('src', products[indexMiddle].PImage );

    rightImg.setAttribute('src', products[indexRight].PImage );

   products[indexLeft].views++;
   products[indexMiddle].views++;
   products[indexRight].views++;
}

renderImg();

leftImg.addEventListener('click', clickCounter);
middleImg.addEventListener('click', clickCounter);
rightImg.addEventListener('click', clickCounter);

function clickCounter(event){
    if(attempt <= maxAttemps){

        let clickedImg = event.target.id;
        if(clickedImg == 'left'){
            products[indexLeft].votes++;
         }
         else if(clickedImg == 'middle'){
            products[indexMiddle].votes++;
         }   
         else if(clickedImg == 'right'){
            products[indexRight].votes++;
         } 
         renderImg();
         attempt++;
    }
    
}    
showResults.addEventListener('click', clickMe);
    function clickMe(){
        for (let i= 0; i< products.length; i++) {
           let liEl = document.createElement('li');
           result.appendChild(liEl);
           liEl.textContent = `${products[i].PName} has ${products[i].votes} votes and ${products[i].views} views.`;
            
        }
        showResults.removeEventListener('click', clickMe);

        leftImg.removeEventListener('click', clickCounter);
        
        middleImg.removeEventListener('click', clickCounter);
        
        rightImg.removeEventListener('click', clickCounter);
    }
    


