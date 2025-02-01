let order = [];
let player_order = [];
let flash;
let turn; //track of count
let good; //bool
let interval_id;
let comp_turn; //bool
let strict = false; //unchecked by default
let noise = true;
let on = false;
let win;

const turn_counter = document.querySelector("#turn");
const top_left = document.querySelector("#topleft");
const top_right = document.querySelector("#topright");
const bottom_left = document.querySelector("#bottomleft");
const bottom_right = document.querySelector("#bottomright");
const strict_button = document.querySelector("#strict");
const on_button = document.querySelector("#on");
const start_button = document.querySelector("#start");


strict_button.addEventListener('click', (event) => {
    if (strict_button.checked == true){
        strict = true;
    }
    else{
        strict = false;
    }
});

on_button.addEventListener('click', (event) =>{
    if(on_button.checked == true){
        on = true;
        turn_counter.innerHTML = "-";
    }else{
        on = false;
        turn_counter.innerHTML = "";
        clearColor();
        clearInterval(interval_id);
    }
});

start_button.addEventListener('click', (event) =>{
    if (on || win){
        play();
    }
});

function play(){
    win = false;
    order = [];
    player_order = [];
    flash = 0;
    interval_id = 0;
    turn = 1;
    turn_counter.innerHTML = 1;
    good = true;

    for(var i = 0; i < 10; i++){
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    // console.log(order);
    comp_turn = true;
    interval_id = setInterval(gameTurn, 800);
}

function gameTurn(){
    on = false;
    if (flash == turn){
        clearInterval(interval_id);
        comp_turn = false;
        clearColor();
        on = true;
    }
    if(comp_turn){
        clearColor();
        setTimeout(() =>{
            if(order[flash] == 1) one();
            if(order[flash] == 2) two();
            if(order[flash] == 3) three();
            if(order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

//color change by simon
function one(){
    if(noise){
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    top_left.style.backgroundColor = "lightgreen";
}
function two(){
    if(noise){
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    top_right.style.backgroundColor = "tomato";
}
function three(){
    if(noise){
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    bottom_left.style.backgroundColor = "yellow";
}
function four(){
    if(noise){
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    bottom_right.style.backgroundColor = "lightskyblue";
}

function clearColor(){
    top_left.style.backgroundColor = "darkgreen";
    top_right.style.backgroundColor = "darkred";
    bottom_left.style.backgroundColor = "goldenrod";
    bottom_right.style.backgroundColor = "darkblue";
}

function flashColor(){
    top_left.style.backgroundColor = "lightgreen";
    top_right.style.backgroundColor = "tomato";
    bottom_left.style.backgroundColor = "yellow";
    bottom_right.style.backgroundColor = "lightskyblue";
}

//by user
top_left.addEventListener('click',(event)=>{
    if(on){
       player_order.push(1);
       check();
       one();
       if(!win){
        setTimeout(() =>{
            clearColor();
        }, 300);
       } 
    }
})

top_right.addEventListener('click',(event)=>{
    if(on){
       player_order.push(2);
       check();
        two();
       if(!win){
        setTimeout(() =>{
            clearColor();
        }, 300);
       } 
    }
})

bottom_left.addEventListener('click',(event)=>{
    if(on){
       player_order.push(3);
       check();
       three();
       if(!win){
        setTimeout(() =>{
            clearColor();
        }, 300);
       } 
    }
})

bottom_right.addEventListener('click',(event)=>{
    if(on){
       player_order.push(4);
       check();
       four();
       if(!win){
        setTimeout(() =>{
            clearColor();
        }, 300);
       } 
    }
})

function check(){
    if(player_order[player_order.length - 1] !== order[player_order.length - 1]) 
        good = false;

    if(player_order.length == 20 && good) 
        winGame();

    if(good == false){
        flashColor();
        turn_counter.innerHTML = "NO!";
        setTimeout(() => {
            turn_counter.innerHTML = turn;
            clearColor();

            if(strict){
                play();
            }else{
                comp_turn = true;
                flash = 0;
                player_order = [];
                good = true;
                interval_id = setInterval(gameTurn, 800);
            }
        }, 800);
        noise = false;
    }
    if(turn == player_order.length && good && !win){
        turn++;
        player_order = [];
        comp_turn = true;
        flash = 0;
        turn_counter.innerHTML = turn;
        interval_id = setInterval(gameTurn, 800);
    }
}

function winGame(){
    flashColor();
    turn_counter.innerHTML = "WIN!";
    on = false;
    win = true;
}































//Learnings
// 3 ways to declare a variable: let(limited, only apply to where it was defined), var(apply to the scope of entire pg), const, preference: NEVER USE A VAR

