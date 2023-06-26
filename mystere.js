const plagenombres = {
    easy:{plage: { min: 1 , max: 10 },vie: 3},
    medium: {plage: { min: 1 , max: 50 },vie:2},
    hard:{plage: { min: 1 , max: 100 },vie: 1}

};
let plageniveauactuelle = plagenombres.easy;
let nombremystere ;
const guessinput = document.getElementById("guess-input");
const guessbutton = document.getElementById("guess-button");
const result = document.getElementById("result");
const essais = document.getElementById("essais");
const difficulty = document.getElementById("difficulty-select");
const restart = document.getElementById("restart");
const plages = document.getElementById("plage");
const change = document.getElementById("change");
const end = document.getElementById("end");
const contairesul =document.getElementById("contairesul");
const combien = new Audio('combien.mp3');
const perdu = new Audio('perdu.mp3');
const gagne = new Audio('gagné.mp3');
const ganbare = new Audio('ganbare.mp3');
let expo ;
let numbertry = 0;
let essai = 1;
let vie = plageniveauactuelle.vie;

function generenombremystere(){
    const min = plageniveauactuelle.plage.min;
    const max = plageniveauactuelle.plage.max;
    return Math.floor(Math.random()*(max - min + 1))+ min;
    
}
function miseajournombre() {
    const selectdifficulty = difficulty.value;
    plageniveauactuelle = plagenombres[selectdifficulty];
    nombremystere = generenombremystere();
    vie = plageniveauactuelle.vie;
    restart.style.display='none';
    guessbutton.disabled =false;
    difficulty.disabled= false;
    change.disabled = false;
    result.textContent ='';
    contairesul.textContent='';
    essais.textContent ='';
    end.textContent = '';
    essai = 0;
    
}
change.addEventListener('click',function() {
    location.reload();
});
difficulty.addEventListener('change',miseajournombre());


    if (difficulty.value === "easy") {
        plages.innerHTML = '(entre '+plageniveauactuelle.plage.min+' et '+plageniveauactuelle.plage.max+')';
        
        
    }else if (difficulty.value === "medium") {
        plages.innerHTML = '(entre '+plageniveauactuelle.plage.min+' et '+plageniveauactuelle.plage.max+')';
    }
    else if (difficulty.value === "hard") {
        plages.innerHTML = '(entre '+plageniveauactuelle.plage.min+' et '+plageniveauactuelle.plage.max+')';
}




function jeudunombremystere() {
    const nombresaisie = parseInt(guessinput.value);
    difficulty.disabled =true;
    change.disabled = true;

    if (nombresaisie > plageniveauactuelle.plage.max ) {
        combien.play();
    }

    
    if (isNaN(nombresaisie)) {
        contairesul.textContent = 'Veuillez saisir un nombre valide';
        return;
        
    }
    
        
    
    essai++;
    if (essai ===1) {
            expo=essai+"<sup>er</sup>";
        }else if (essai ===2) {
            expo=essai+"<sup>ème</sup>";
        }else if (essai ===3) {
            expo=essai+"<sup>ème</sup>";
        }
        
    let resultText =nombresaisie+ " ?... c'est ";
    if (nombresaisie ===nombremystere ) {
        result.innerHTML = "Gagné ! 😄";
        end.innerHTML = "numéro mystère : "+nombremystere;
        restart.style.display ='flex';
        restart.style.margin ='auto';
        guessbutton.disabled =true;
        difficulty.disabled = true;
        change.disabled = true;
        gagne.play();
    }else if (nombresaisie > nombremystere) {
    contairesul.innerHTML+="<div style='font-weight: bold; color: black;font-size: 18px;'>"+expo+" essai"+"</div>";
    contairesul.innerHTML+=resultText+" ➖";
    contairesul.innerHTML += "<div class=\"separator\"></div>";
    ganbare.play();
    vie--;
    }else{
        contairesul.innerHTML+="<div style='font-weight: bold; color: black;font-size: 18px;'>"+expo+" essai"+"</div>";
        contairesul.innerHTML+=resultText+" ➕";
        contairesul.innerHTML += "<div class=\"separator\"></div>";
        ganbare.play();
        vie--;

    }
    if (vie === 0) {
        result.innerHTML= 'Game Over !!! 😵';
        end.innerHTML= "numéro mystère : "+nombremystere;
        guessbutton.disabled =true;
        difficulty.disabled = true;
        change.disabled = true;
        restart.style.display ='flex';
        restart.style.margin ='auto';
        perdu.play();
        return;
        }
    guessinput.value='';
    
}
guessbutton.addEventListener('click',jeudunombremystere);
restart.addEventListener('click',miseajournombre);
console.log(nombremystere);