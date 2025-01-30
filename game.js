//comrades, this is the people's Javascript file

const comrade = {//the object "comrade" stores the players data
    //self explanitory
    name: "Владимир",
    currentRubles: 0,
    totalRubles: 0,
    //----------------

    buildings: [0],
    //an array of integers that stores the amount of buildings that have been built
    //the index represents the building, the value stored at that index is the amount of that building
}

const buildingInfo = [];// stores information about building types

class BuildingType {//the class "BuildingType" will be used to create building types
    constructor(name, cost, production, description, img) {
        this.name = name,
            this.cost = cost,
            this.production = production;
        this.description = description;
        this.img = img;
        this.unlocked = false;
        buildingInfo.push(this);
    }
}

new BuildingType("FARM", 25, 1, "A farm filled with starving peasants.", "images/Farm.png");
new BuildingType("COAL MINE", 300, 10, "\"No children work here, comrade.\"", "images/coal.png");
new BuildingType("OIL REFINERY", 3500, 100, 
    "\"We didn't even have to invade the middle east.\"", "images/Oil.png");
new BuildingType("NUCLEAR POWER PLANT", 40000, 1000,
    "\"Those were just rumors. Nobody here has more than 5 fingers.\"", "images/Nuclear.png");
new BuildingType("BALLOON", 150000, 5000, 
    "Recon using the latest advancments in chinese technology", "images/Balloon.png");

const generateProfit = (fromClick) => {
    fromClick = fromClick || false;
    let profit = 0;//stores profit

    if (fromClick) ++profit;//if the profit was from a click, it is set to 1
    else {
        for (let i = comrade.buildings.length - 1; i > -1; --i) {
            profit += buildingInfo[i].production * comrade.buildings[i];
        }//loops through all of the building types and calculates profit
    }

    comrade.currentRubles += profit;//profit is added
    comrade.totalRubles += profit;  //

    document.getElementById("rubleCounter").innerHTML = `RUBLES: ${comrade.currentRubles}`;

    for (let i = 0; buildingInfo.length > i; ++i) {
        if (buildingInfo[i].unlocked === false && comrade.totalRubles >= buildingInfo[i].cost)
            unlockBuilding(buildingInfo[i], i);//pass by reference
    }//this unlocks building types when the total amount of rubles produced is greater than or equal to the cost of the building
    localStorage.setItem("localSave", JSON.stringify(comrade));
};

const unlockBuilding = (building, e) => {//this is the function that unlocks the building
    building.unlocked = true;

    while (comrade.buildings.length < e + 1) {
        comrade.buildings.push(0);
    }

    document.getElementById("buildingContainer").innerHTML += `
    <div class="buildingDisplay" id="display${e}">
        <img src="${building.img}" class="buildingImage">
        <div class="building">
            <button onclick="buyBuilding(${e}); ">+</button>
            <p style="text-align: center;" id="amount${e}">${comrade.buildings[e]}</p>
            <button onclick="sellBuilding(${e});">-</button>
        </div>
        <div style="text-align: center">
            <p class="text">${building.name}</p>
            <span class="text">${building.description}</span>
            <span id="cost${e}" class="text">Cost: 
            ${Math.round(buildingInfo[e].cost * (1.15 ** comrade.buildings[e]))}</span>
        </div>
        <br>
    </div>`//this adds the HTML for each building display
};

const buyBuilding = (e) => {
    if (comrade.currentRubles >= Math.round(buildingInfo[e].cost * (1.15 ** comrade.buildings[e]))) {
        comrade.currentRubles -= Math.round(buildingInfo[e].cost * (1.15 ** comrade.buildings[e]));
        ++comrade.buildings[e];
        document.getElementById(`cost${e}`).innerHTML = `Cost: ${Math.round(Math.round(buildingInfo[e].cost * (1.15 ** comrade.buildings[e])))}`;
        document.getElementById(`amount${e}`).innerHTML = comrade.buildings[e];
    }
    document.getElementById("rubleCounter").innerHTML = `RUBLES: ${comrade.currentRubles}`;
    let rps = 0;
    for (let i = comrade.buildings.length - 1; i > -1; --i) {
        rps += buildingInfo[i].production * comrade.buildings[i];
    }//loops through all of the building types and calculates rubles per second
    document.getElementById("rpsCounter").innerHTML = `RUBLES PER SECOND: ${rps}`;
}

const sellBuilding = (e) => {
    if (comrade.buildings[e] > 0) {
        --comrade.buildings[e];
        comrade.currentRubles += Math.round(buildingInfo[e].cost * (1.15 ** comrade.buildings[e]));
        document.getElementById(`cost${e}`).innerHTML = `Cost: ${Math.round(Math.round(buildingInfo[e].cost * (1.15 ** comrade.buildings[e])))}`;
        document.getElementById(`amount${e}`).innerHTML = comrade.buildings[e];
    }
    document.getElementById("rubleCounter").innerHTML = `RUBLES: ${comrade.currentRubles}`;
    let rps = 0;
    for (let i = comrade.buildings.length - 1; i > -1; --i) {
        rps += buildingInfo[i].production * comrade.buildings[i];
    }//loops through all of the building types and calculates rubles per second
    document.getElementById("rpsCounter").innerHTML = `RUBLES PER SECOND: ${rps}`;
}