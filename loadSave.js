//comrades, this is the people's Javascript file

const loadTextSave = (saveText) => {//this loads saves

    const temp = {};//used to store player data before it is loaded to localStorage

    const letters = "ABCDEFGHIJ";//this is used for decoding saves
    let validSave = true;//self explanitory
    let count = 0;//used for decoding the saveText

    // save layout [namelength, name data ... , rubles, totalRubles, buildings ...] all of these things are stored as numbers
    //"JKBBGKBABKBBFKBBGKJFKBBFKJHKBBIKBABKCCDFHDKEHICGBKFKDKEKCKB" is an example of a working save file

    saveText = saveText.split("").map((e) => {
        if (e !== "K") {
            if ((letters.indexOf(e) === -1)) validSave = false;
            return letters.indexOf(e);
        } else return e;
    }).join("").split("K");//converts "saveText" from a string to an array of numbers

    for (let i = saveText.length - 1; i > -1; --i) {
        if(saveText[i] === ""){
            saveText[i] = "0";
            validSave = false;
        }
        saveText[i] = Number(saveText[i]);
    }

    if (saveText.length > 3 + saveText[0]) {
        count = saveText[0];
        temp.name = "";
        for (let i = 1; i < count + 1; ++i) {
            if (saveText[i] > 31)
            temp.name += String.fromCharCode(saveText[i]);
        }

        temp.currentRubles = saveText[count + 1];
        temp.totalRubles = saveText[count + 2];
        temp.buildings = [];

        for (let i = count + 3; i < saveText.length; ++i) {
            temp.buildings.push(saveText[i]);
        }

    } else validSave = false;

    if (!validSave) document.getElementById("loadGame").innerHTML = "&emsp; &thinsp; Enter a real save file, comrade: <input style='position: absolute;' oninput='loadTextSave(this.value)'>";
    else {
        localStorage.setItem("localSave", JSON.stringify(temp));
        document.getElementById("toGame").click();
    }

}