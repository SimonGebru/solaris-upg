// Bas-URL för API
const baseUrl = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com";

// Globala variabler
let apiKey = "";

// 1. Hämta API-nyckel
const fetchApiKey = async () => {
    try {
      const response = await fetch(`${baseUrl}/keys`, { method: "POST" });
      const data = await response.json();
      apiKey = data.key;
      console.log("API Key fetched:", apiKey);
    } catch (error) {
      console.error("Failed to fetch API key:", error);
    }
  };
  
  // 2. Hämta data om himlakroppar
  const fetchPlanets = async () => {
    try {
      const response = await fetch(`${baseUrl}/bodies`, {
        method: "GET",
        headers: { "x-zocom": apiKey },
      });
      const data = await response.json();
      const planets = data.bodies;
      console.log("Planets fetched:", planets);
  
      // Lägg till klickhändelser
      setupPlanetClickEvents(planets);
    } catch (error) {
      console.error("Failed to fetch planets:", error);
    }
  };
  
  // 3. Klickhändelse för varje planet
  const setupPlanetClickEvents = (planets) => {
    const planetElements = document.querySelectorAll(".planet");
  
    planetElements.forEach((planetElement) => {
      const planetName = planetElement.dataset.planet;
  
      const planetData = planets.find(
        (planet) => planet.name?.toLowerCase() === planetName.toLowerCase()
      );
  
      if (planetData) {
        planetElement.addEventListener("click", () => showOverlay(planetData));
      }
    });
  };
  
  // 4. Visa overlay
  const showOverlay = (planet) => {
    const overlay = document.getElementById("planet-overlay");
    const sun = document.querySelector(".sun");


    // Uppdatera rubriker och innehåll
    document.getElementById("overlay-title").innerText = planet.name;
    document.getElementById("overlay-latin-name").innerText = planet.latinName;
    document.getElementById("overlay-description").innerText = planet.desc;
    document.getElementById("overlay-circumference").innerText = `${planet.circumference} km`;
    document.getElementById("overlay-distance").innerText = `${planet.distance} km`;
    document.getElementById("overlay-max-temp").innerText = `${planet.temp.day}°C`;
    document.getElementById("overlay-min-temp").innerText = `${planet.temp.night}°C`;
    document.getElementById("overlay-moons").innerText =
        planet.moons.length > 0 ? planet.moons.join(", ") : "Inga månar";

    // Visa overlay och dölja resten av sidan
    overlay.classList.add("visible");
    document.body.classList.add("overlay-visible");

    // Lägg till stäng-knappens funktion
    document.getElementById("close-overlay").addEventListener("click", () => {
        overlay.classList.remove("visible");
        document.body.classList.remove("overlay-visible");
        sun.style.backgroundImage = ""; // Återställ solen
    });
};
  
  // Initiera sidan
  const init = async () => {
    await fetchApiKey();
    await fetchPlanets();
  };
  
  init();