//Model
//Tellere//////////////
let myTimer;                        //Dette er til hovedteller instanser som kjører alle funksjonene i spillet
let sekunder = 120;                 //Spillet kjører i 120 sekunder
let kompisNedTeller = 15;           //Vi lager tilfeldige kompiser hver 15. sekund
let objektNedTeller = 6;            //Vi lager nye objekter hver 6. sekund
let started = false;                //Denne variabelen trenger vi til Start knappen for å hindre flere instanser av hovedtelleren
//////////////////////
let app = document.getElementById('app');
let kulhetsPoeng = 20;               //Vi starter med 20 poeng
//Objekter-kompiser
let kompiser = ['per','lars'];      //Liste med kompiser
let riktigHilsen;
let hilsenVarRiktig = false;        //Startverdien til hilsenVarRiktig
let harHilst = false;               //Startverdien til harHilst
let objekter = ['bensin', 'bitcoin','kebab','vodka']; //Liste med objekter
let tilfeldigObjekt = '';   //Startverdien til tilfeldigObjekt
let tilfeldigKompis = '';   //Startverdien til tilfeldigKompis

const startButton = document.getElementById('startButton');
const endButton = document.getElementById('endButton');


//View
updateView();

function updateView(){
    //Hvis hovedtelleren er lik 0, eller kulhetsPoeng er lik 0, eller mindre
    if(sekunder == 0 || kulhetsPoeng <= 0){
        gameOver();
    }
    //kulhetsPoeng er lik 100, eller mer
    else if(kulhetsPoeng >= 100){
        gameOverMedHundreEllerOverPoeng();
    }
    else{
        //Her kommer hele applikasjonen som viser seg inn i nettleseren
        app.innerHTML = /*HTML*/`<div class="mainDiv">
        <div class="menuDiv">
        <div id="startButton">
            <button onclick="startSpillet()">Start spillet</button><div><h4>Timer: </h4>${sekunder}</div>
        </div>
        <div id="endButton">
            <br/><br/><br/>
            <h4>Kulhetsfaktor: </h4>
            ${kulhetsPoeng}
            <br/><br/><br/>
            <button onclick="endGame()">End Game</button>
        </div>
        </div>
       
        <div id="veiDiv" class="veiDiv"><div class="bil"><img src="img/New_Project.png"></div></div>
        
        <div id="hendelserDiv" class="menuDiv">
            <h4>Tilfeldige hendelser:</h4>
        <div/>
            `;
            //Denne delen slår seg på når vi har trykket på den riktige Hilsen knapp
            if(hilsenVarRiktig == true && harHilst == true){
                document.getElementById('hendelserDiv').innerHTML += /*HTML*/ `<div id="kompisDiv">Hilsen var riktig! Du kan kjøre videre.</div><br/>`;
                hilsenVarRiktig = false;
                harHilst = false;
            }
            ////Denne delen slår seg på, når vi ikke har hilst (det var ikke noen å hilse på) 
            else{
                //Denne delen slår seg på etter at vi har laget en tilfeldig kompis
                if(tilfeldigKompis != ''){

                //Vi stopper opp litt
                document.getElementById('veiDiv').style.animation = '0.0s linear infinite roadAnimation';

                document.getElementById('hendelserDiv').innerHTML += /*HTML*/ `<div id="kompisDiv"><img src="img/${tilfeldigKompis}.png" width="150" height="150"></div><br/>
                <h4>Hils på han!</h4>
                <button onclick="btnController(this.innerHTML)">Hilsen 1</button>
                <button onclick="btnController(this.innerHTML)">Hilsen 2</button>
                <button onclick="btnController(this.innerHTML)">Hilsen 3</button>`;
                //Denne delen slår seg på etter at vi har trykket på feil Hilsen knapp
                if(hilsenVarRiktig == false && harHilst == true){
                    document.getElementById('hendelserDiv').innerHTML += /*HTML*/ `<div id="kompisDiv">Hilsen var ikke riktig! Du mistet 5 poeng!</div><br/>`;
                    harHilst = false;
                }
            }
            //Denne delen slår seg på etter at vi har laget et tilfeldig objekt
            if(tilfeldigObjekt != ''){
                document.getElementById('hendelserDiv').innerHTML += /*HTML*/ `<div id="objektDiv"><img src="img/${tilfeldigObjekt}.png" width="150" height="150"></div><br/>
                <button onclick="btnController(this.innerHTML)">Plukk opp</button>
                <button onclick="btnController(this.innerHTML)">Kjør videre</button>`;
            }
            }       
        }

}-

function gameOver(){
    app.innerHTML = `
    <h1>GAME OVER</h1><br/>
    Du har ${kulhetsPoeng} kulhetspoeng!<br/>
    Prøv igjen! <button onclick="location.reload()">Start på nytt!</button>
    `;
    //Stoppe hovedtelleren
    clearInterval(myTimer);
}

function gameOverMedHundreEllerOverPoeng(){
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
    // Starte hoved timeren ved å trykke på Start knapp
    if(started){
        return
    } else{
        //Her kjører vi Spill() funksjonen hver sekund
        myTimer = setInterval(Spill,1000);
        started = true;
    }
}

function Spill() {
    //Her teller vi ned hovedteller, kompis, og objektnedteller
    sekunder--;
    kompisNedTeller--;
    objektNedTeller--;
    
    //Når kompis nedteller er lik 0 da lager vi en tilfeldig kompis og en tilfeldig hilsen som kompisen aksepterer
    //Så tilbakestiller vi kompisNedtelleren
    if(kompisNedTeller == 0){
        tilfeldigKompisFunksjon();
        //Lage tilfeldig hilsen mellom 1-3 som gjør at vi kan kjøre videre
        //Vi kan sammenligne verdien til riktigHilsen inn i updateView ved å trykke 3 forksjellige Hilsen knapp
        riktigHilsen = 1 + Math.floor(Math.random() * 3);
        clearInterval(myTimer);

        kompisNedTeller += 15;
    }
    //Når objektnedtelleren er lik 0 da lager vi en tilfeldig objekt og tilbakstiller vi objektNedTeller-en
    if(objektNedTeller == 0){
        tilfeldigObjektFunksjon();

        objektNedTeller += 6;
    }
    updateView();
}

//Returnere tilfeldig kompis fra liste i model
function tilfeldigKompisFunksjon(){
    ////Tilfeldig kompis fra kompis liste 0-1
    tilfeldigKompis = kompiser[Math.floor(Math.random() * 2)];
    return tilfeldigKompis;
}
//Returnere tilfeldig objekt fra liste i model
function tilfeldigObjektFunksjon(){
    //Tilfeldig objekt fra objekt liste 0-3
    tilfeldigObjekt = objekter[Math.floor(Math.random() * 4)];
    return tilfeldigObjekt;
    
}
//Sjekke hva knapp vi trykte på, og hva det gjør med utfallet
function btnController(buttonPressed){
    let btnPressed;
    btnPressed = buttonPressed;
    if(btnPressed == 'Plukk opp'){
        if(tilfeldigObjekt == 'bensin' || tilfeldigObjekt == 'bitcoin' || tilfeldigObjekt == 'kebab'){
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

function endGame() {
    location.reload();
}