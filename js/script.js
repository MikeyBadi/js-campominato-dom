// **Consegna**
// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.

const container = document.querySelector(".mb_container");
const arrNumber = [];
const BOMB_NUMB = 16;
let BOMB = [];

let TRIES = 0;

console.log(arrNumber);

const btn = document.querySelector(".start").addEventListener("click", function(){
  arrNumber.length = 0
  BOMB.length = 0
  container.innerHTML = ""
  sqrStart()
});

const btnre = document.querySelector(".restartBtn").addEventListener("click", function(){
  TRIES = 0
  arrNumber.length = 0
  container.innerHTML = ""
  const restart = document.querySelector(".restart")
  restart.style.display="none"
  console.log(restart);
  sqrStart()
});

function sqrStart(){
  const level = document.querySelector("#lvlChange").value;
  generateBomb(level)
  
  clickStart()

};

function clickStart(){
  const level = document.querySelector("#lvlChange").value;
  for(let i= 1; i<=level; i++){
    const sqr = sqrGen(container, parseInt(level));

    sqr.addEventListener('click', function(){
      // this è una parola chiave che mi "dice" quale è l'elemento cickato
      this.classList.add("mb_selected");

      const bombDet= parseInt(sqr.innerText);
      console.log(bombDet);

      const allSqr = document.querySelectorAll(".square")
      console.log (allSqr, "all sqr")

      const allSpan = document.querySelectorAll("span")
      console.log (allSpan)

      if(BOMB.includes(bombDet)){
        
        console.log("hai perso");
        
        sqr.classList.add("mb_odd");
        const restart = document.querySelector(".restart");
        
        restart.style.display="block";
        
        sqr.classList.add("mb_selected");
        console.log("-----",sqr);
        
        for(let i = 0; i< allSpan.length; i++){
          const spn = parseInt(allSpan[i].innerText)
          console.log(spn);
          // const
          if(BOMB.includes(spn)){
            allSqr[i].classList.add("mb_odd","mb_selected")
          }
        };
        
        document.querySelector('.tries').innerHTML = `Hai tentato: ${TRIES} volte ma non è bastato!`;
        
      }else{
        this.classList.add("mb_clicked");
        TRIES++;
      };
      
    });
  };
}


// creo i quadratini
function sqrGen(target, lvl){
  const sqr = document.createElement("div");

  
  if(lvl === 100){
    sqr.className += "mb_square_100";
  } else if (lvl === 81){
    sqr.className += "mb_square_81";
  } else if (lvl === 49){
    sqr.className += "mb_square_49";
  };
  const level = document.querySelector("#lvlChange").value;
  // aggiungere il numero non ripetuto
  let number = numberRandOne (1, level);
  // console.log("------", number);
  sqr.innerHTML = `<span>${number}</span>`;
  // console.log(sqr);
  sqr.classList.add("square");
  target.append(sqr);
  return sqr;
};


//creo numeri univoci
function numberRandOne(min, max){
  let number = null;
  let valid = false;

  while(!valid){
    number = numberGenRand(min, max);
    if(!arrNumber.includes(number)){
      valid = true;
      arrNumber.push(number);
    };
  };
  return number;

};


// creo i numeri random
function numberGenRand(min, max){
  return Math.floor(Math.random()*(max - min + 1) + min);
};

// creo un modo per aggiungere le classi odd ed even
// function oddEven (n){
//   if(n % 2) return "mb_odd";
//   return "mb_even";
// };

function generateBomb(lvl){
  const genBomb = BOMB;
  while (genBomb.length < BOMB_NUMB){
    const bomb = numberGenRand(1,lvl)
    
    if(!genBomb.includes(bomb)){
       genBomb.push(bomb)
    };
  }  ;
  console.log(genBomb);
  return genBomb;
}