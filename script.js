// Write your JavaScript code here!
window.addEventListener("load", function () {

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json){
         console.log(json)
         const div = document.getElementById("missionTarget");
         num = Math.floor(Math.random()*json.length)
         returnNum = json[num];

         div.innerHTML = `        
               <ol>
                  <li>Name: ${returnNum.name}</li>
                  <li>Diameter: ${returnNum.diameter}</li>
                  <li>Star: ${returnNum.star}</li>
                  <li>Distance from Earth: ${returnNum.distance}</li>
                  <li>Number of Moons: ${returnNum.moons}</li>
               </ol>
               <img src="${returnNum.image}">
               `;
      });
   });

   let list = document.getElementById("faultyItems");
   list.style.visibility = "hidden"

   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");

   let form = document.querySelector("form");

   form.addEventListener("submit", function (event) {
      event.preventDefault();
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let pilot = pilotNameInput.value

      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let copilot = copilotNameInput.value

      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let fuelInput = fuelLevelInput.value

      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      let cargoInput = cargoMassInput.value


      if (pilot === "" || copilot === "" || fuelInput === "" || cargoInput === "") {
         alert("All Fields Required");
      }
      else if (!isNaN(pilot) || !isNaN(copilot) || isNaN(fuelInput) || isNaN(cargoInput)) {
         alert("Invalid Entry");
      }
      else {
         list.style.visibility = "visible";
         pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch.`
         copilotStatus.innerHTML = `Co-Pilot ${copilot} is ready for launch.`

         let launchStatus = document.getElementById("launchStatus")
         if (fuelInput < 10000 && cargoInput <= 10000) {
            fuelStatus.innerHTML = "Fuel is too low for launch"
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style.color = "red"
         }
         else if (fuelInput >= 10000 && cargoInput > 10000) {
            cargoStatus.innerHTML = "Cargo mass is too large for launch"
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style.color = "red"
         }
         else if (fuelInput < 10000 && cargoInput > 10000) {
            fuelStatus.innerHTML = "Fuel is too low for launch"
            cargoStatus.innerHTML = "Cargo mass is too large for launch"
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style.color = "red"
         }
         else {
            fuelStatus.innerHTML = "Fuel is high enough to launch"
            cargoStatus.innerHTML = "Cargo mass is low enough to launch"
            launchStatus.innerHTML = "Shuttle is ready for launch"
            launchStatus.style.color = "green"
         }

      }
   });
});
