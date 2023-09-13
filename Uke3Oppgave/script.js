//Model
//Tellere//////////////
let myTimer;
let sekunder = 120;
let kompisNedTeller = 15;
let objektNedTeller = 6;
let started = false;
//////////////////////
let app = document.getElementById('app');
let kulhetsPoeng = 20; //Vi starter med 20 poeng
//Objekter-kompiser
let kompiser = ['Per','Lars'];
let riktigHilsen;
let hilsenVarRiktig = false;
let harHilst = false;
let objekter = ['bensin', 'penger','kebab','alkohol'];
let tilfeldigObjekt = '';
let tilfeldigKompis = '';


//View
updateView();

function updateView(){
    if(sekunder == 0 || kulhetsPoeng <= 0){
        gameOver();
    }
    else if(kulhetsPoeng >= 100){
        gameOverMedHundrePoeng();
    }
    else{
        //Her kommer hele applikasjonen som viser seg inn i nettleseren
        app.innerHTML = /*HTML*/`<div class="mainDiv">
        <div class="menuDiv">
            <button onclick="startSpillet()">Start spillet</button><div><h4>Timer: </h4>${sekunder}</div>
            <br/><br/><br/>
            <h4>Kulhetsfaktor: </h4>
            ${kulhetsPoeng}
        </div>
        
        <div class="veiDiv">Vei med bil på</div>
        <div id="hendelserDiv" class="menuDiv">
            <h4>Tilfeldige hendelser:</h4>
        <div/>
            `;

            if(hilsenVarRiktig == true && harHilst == true){
                document.getElementById('hendelserDiv').innerHTML += /*HTML*/ `<div id="kompisDiv">Hilsen var riktig! Du kan kjøre videre.</div><br/>`;
                hilsenVarRiktig = false;
                harHilst = false;
            }
            else{
                if(tilfeldigKompis != ''){
                document.getElementById('hendelserDiv').innerHTML += /*HTML*/ `<div id="kompisDiv"><img src="img/${tilfeldigKompis}.png" width="150" height="150"></div><br/>
                <h4>Hils på han!</h4>
                <button onclick="btnController(this.innerHTML)">Hilsen 1</button>
                <button onclick="btnController(this.innerHTML)">Hilsen 2</button>
                <button onclick="btnController(this.innerHTML)">Hilsen 3</button>`;

                if(hilsenVarRiktig == false && harHilst == true){
                    document.getElementById('hendelserDiv').innerHTML += /*HTML*/ `<div id="kompisDiv">Hilsen var ikke riktig! Du mistet 5 poeng!</div><br/>`;
                    harHilst = false;
                }
            }

            if(tilfeldigObjekt != ''){
                document.getElementById('hendelserDiv').innerHTML += /*HTML*/ `<div id="objektDiv"><img src="img/${tilfeldigObjekt}.png" width="150" height="150"></div><br/>
                <button onclick="btnController(this.innerHTML)">Plukk opp</button>
                <button onclick="btnController(this.innerHTML)">Kjør videre</button>`;
            }
            }       
        }

}

function gameOver(){
    app.innerHTML = `
    <h1>GAME OVER</h1><br/>
    Du har ${kulhetsPoeng} kulhetspoeng!<br/>
    Prøv igjen! <button onclick="location.reload()">Start på nytt!</button>
    `;
    //Stoppe hovedtelleren
    clearInterval(myTimer);
}

function gameOverMedHundrePoeng(){
    app.innerHTML = `
    <h1>GAME OVER</h1><br/>
    Du har ${kulhetsPoeng} kulhetspoeng!<br/>
    Du vant denne gang! Kjempe bra!<button onclick="location.reload()">Start på nytt!</button>
    `;
    //Stoppe hovedtelleren
    clearInterval(myTimer);
}

//Controller
//Startknapp event
function startSpillet(){
    // Timer call
    if(started){
        return
    } else{
        //Her kjører vi Spill() funksjonen hver sekund
        myTimer = setInterval(Spill,1000);
        started = true;
    }
}

function Spill() {
    sekunder--;
    kompisNedTeller--;
    objektNedTeller--;
    
    //Returnere tilfeldige kompis og tilbakestille kompisNedtelleren
    if(kompisNedTeller == 0){
        tilfeldigKompisFunksjon();
        //Lage tilfeldig hilsen mellom 1-3 som gjør at vi kan kjøre videre
        //Vi kan sammenligne verdien til riktigHilsen inn i updateView ved å trykke 3 forksjellige Hilsen knapp
        riktigHilsen = 1 + Math.floor(Math.random() * 3);
        clearInterval(myTimer);

        kompisNedTeller += 15;
    }
    //Returnere tilfeldige objekt og tilbakestille objetktNedtelleren
    //Regne ut kulhetsPoeng for de enkelte objekter
    if(objektNedTeller == 0){
        tilfeldigObjektFunksjon();

        objektNedTeller += 6;
    }
    updateView();
}


function tilfeldigKompisFunksjon(){
    ////Tilfeldig kompis fra kompis liste 0-1
    tilfeldigKompis = kompiser[Math.floor(Math.random() * 2)];
    return tilfeldigKompis;
}

function tilfeldigObjektFunksjon(){
    //Tilfeldig objekt fra objekt liste 0-3
    tilfeldigObjekt = objekter[Math.floor(Math.random() * 4)];
    return tilfeldigObjekt;
    
}

function btnController(buttonPressed){
    let btnPressed;
    btnPressed = buttonPressed;
    if(btnPressed == 'Plukk opp'){
        if(tilfeldigObjekt == 'bensin' || tilfeldigObjekt == 'penger' || tilfeldigObjekt == 'kebab'){
            kulhetsPoeng += 5;
        }else{
            kulhetsPoeng -= 10;
        }
        tilfeldigObjekt = '';
        updateView();
    }
    else if(btnPressed == 'Kjør videre'){
        tilfeldigObjekt = '';
        updateView();
    }

    else if(btnPressed == 'Hilsen 1'){
        if(riktigHilsen == 1){
            hilsenVarRiktig = true;
            harHilst = true;
            kulhetsPoeng += 20;
            tilfeldigKompis = '';
            myTimer = setInterval(Spill,1000);
            updateView();
        }
        else{
            hilsenVarRiktig = false;
            harHilst = true;
            kulhetsPoeng -= 5;
            updateView();
        }
    }

    else if(btnPressed == 'Hilsen 2'){
        if(riktigHilsen == 2){
            hilsenVarRiktig = true;
            harHilst = true;
            kulhetsPoeng += 20;
            tilfeldigKompis = '';
            myTimer = setInterval(Spill,1000);
            updateView();
        }
        else{
            hilsenVarRiktig = false;
            harHilst = true;
            kulhetsPoeng -= 5;
            updateView();
        }
    }

    else if(btnPressed == 'Hilsen 3'){
        if(riktigHilsen == 3){
            hilsenVarRiktig = true;
            harHilst = true;
            kulhetsPoeng += 20;
            tilfeldigKompis = '';
            myTimer = setInterval(Spill,1000);
            updateView();
        }
        else{
            hilsenVarRiktig = false;
            harHilst = true;
            kulhetsPoeng -= 5;
            updateView();
        }
    }
    else return;
}