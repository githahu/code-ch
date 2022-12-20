// Your code here

let objGlobal;

// displaying nodes
 const nameDisplay = document.querySelector("#name");
 const imgDisplay = document.querySelector("#image");
 const voteCountDisplay = document.querySelector("#vote-count");

 //form submission
const addVotesForm = document.querySelector("#votes-form");
const votesInputBox = document.querySelector("#votes");
// API END POINT
const uri = "http://localhost:3000/characters"

const characterBarContainer = document.querySelector("#character-bar");

fetch(uri)
    .then((response) => response.json())
    .then((data) => {
        console.log("Succes:", data);
        renderCharacterDisplay(data[0]);


    // Iterating through each array elements to render a respective element
    data.forEach((element) => {
        renderList(element);
    });

    })

    .catch((error) => {
        console.error("Error:", error);
    });
// create a function for each individual element
    function renderList(characterObj) {
        //create a span element with character's name
        let characterSpanE1 = document.createElement("span");
        characterSpanE1.textContent = characterObj.name;
        //append span element to character-bar container
        characterBarContainer.appendChild(characterSpanE1);

        // click listener
    characterSpanE1.addEventListener("click", () => {
        renderCharacterDisplay(characterObj);
    });
    }
    // render character display information
    function renderCharacterDisplay(characterObj) {
        let characterSpanE1 = document.createElement("span");
        // render name display information
        nameDisplay.textContent = characterObj.name;
        imgDisplay.src = characterObj.image;
        voteCountDisplay.textContent = characterObj.votes;

        //passing chaactr object to the globaL scope for adding votes
        objGlobal = characterObj;
    }

    //form submission
    addVotesForm.addEventListener("submit", (event) => {
        event.preventDefault();
        objGlobal.votes += parseInt(votesInputBox.value);
        voteCountDisplay.textContent = objGlobal.votes;
        patchRequest(objGlobal);
    })