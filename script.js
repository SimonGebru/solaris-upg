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
      const planets = data.bodies; // Extrahera bodies från responsen
      console.log("Planets fetched:", planets);
  
      // Lägg till klickhändelser på hårdkodade planeter
      setupPlanetClickEvents(planets);
    } catch (error) {
      console.error("Failed to fetch planets:", error);
    }
  };
  
  const setupPlanetClickEvents = (planets) => {
    const planetElements = document.querySelectorAll(".planet");
  
    planetElements.forEach((planetElement) => {
      const planetName = planetElement.dataset.planet;
      console.log("Planet element found:", planetElement, "with data-planet:", planetName);
  
      const planetData = planets.find(
        (planet) =>
          planet.name &&
          planetName &&
          planet.name.toLowerCase() === planetName.toLowerCase()
      );
  
      if (planetData) {
        console.log("Adding click event for:", planetName);
        planetElement.addEventListener("click", () => showOverlay(planetData));
      } else {
        console.warn(`No data found for planet: ${planetName}`);
      }
    });
  };
  
  const showOverlay = (planet) => {
    console.log("Showing overlay for:", planet);
  
    // Hämta overlay-elementet
    const overlay = document.getElementById("planet-overlay");
  
    // Fyll overlay med planetdata
    document.getElementById("overlay-title").innerText = planet.name;
    document.getElementById("overlay-description").innerText = planet.desc;
    document.getElementById("overlay-latin-name").innerText = planet.latinName;
    document.getElementById("overlay-circumference").innerText = `${planet.circumference} km`;
    document.getElementById("overlay-distance").innerText = `${planet.distance} km`;
    document.getElementById("overlay-temperature").innerText = `Dag: ${planet.temp.day}°C / Natt: ${planet.temp.night}°C`;
    document.getElementById("overlay-rotation").innerText = `${planet.rotation} dygn`;
    document.getElementById("overlay-orbital-period").innerText = `${planet.orbitalPeriod} jorddygn`;
    document.getElementById("overlay-moons").innerText = planet.moons.length > 0
      ? planet.moons.join(", ")
      : "Inga månar";
  
    // Visa overlay
    overlay.classList.add("visible");
    overlay.classList.remove("hidden");
    overlay.setAttribute("aria-hidden", "false");
  
    // Stäng overlay vid klick på stäng-knappen
    document.getElementById("close-overlay").addEventListener("click", () => {
      overlay.classList.add("hidden");
      overlay.classList.remove("visible");
      overlay.setAttribute("aria-hidden", "true");
    });
  };

// 5. Initiera sidan
const init = async () => {
  await fetchApiKey(); // Hämta API-nyckeln
  await fetchPlanets(); // Hämta planeter och rendera
};

init();