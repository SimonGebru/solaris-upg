// Bas-URL för API
const baseUrl = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com";

// Globala variabler
let apiKey = "";

// Hämta API-nyckel
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

// Hämta data
const fetchPlanets = async () => {
  try {
    const response = await fetch(`${baseUrl}/bodies`, {
      method: "GET",
      headers: { "x-zocom": apiKey },
    });
    const data = await response.json();
    const bodies = data.bodies;
    console.log("Bodies fetched:", bodies);

    // Lägg till klickhändelser
    setupPlanetClickEvents(bodies);
  } catch (error) {
    console.error("Failed to fetch planets:", error);
  }
};

// Klickhändelse för varje planet och sol
const setupPlanetClickEvents = (bodies) => {
  if (!Array.isArray(bodies)) {
    console.error("Expected an array but got:", bodies);
    return;
  }

  const planetElements = document.querySelectorAll(".planet, .sun");

  planetElements.forEach((planetElement) => {
    const planetName = planetElement.dataset.planet;

    const planetData = bodies.find(
      (body) => body.name?.toLowerCase() === planetName.toLowerCase()
    );

    if (planetData) {
      planetElement.addEventListener("click", () => showOverlay(planetData));
    } else {
      console.warn(`No data found for planet: ${planetName}`);
    }
  });
};

const planetColors = {
  Merkurius: "#888888",
  Venus: "#e7cdcd",
  Jorden: "#428ed5",
  Mars: "#ef5f5f",
  Jupiter: "#e29468",
  Saturnus: "#c7aa72",
  Uranus: "#c9d4f1",
  Neptunus: "#7a91a7",
  Solen: "rgba(255, 208, 41, 1)",
};

const showOverlay = (body) => {
  const overlay = document.getElementById("planet-overlay");
  const planetIndicator = document.querySelector(".planet-indicator");

  // Uppdatera overlay-innehåll
  document.getElementById("overlay-title").innerText = body.name;
  document.getElementById("overlay-latin-name").innerText = body.latinName;
  document.getElementById("overlay-description").innerText = body.desc;
  document.getElementById("overlay-circumference").innerText = `${body.circumference} km`;
  document.getElementById("overlay-distance").innerText = `${body.distance} km`;
  document.getElementById("overlay-max-temp").innerText = `${body.temp.day}°C`;
  document.getElementById("overlay-min-temp").innerText = `${body.temp.night}°C`;
  document.getElementById("overlay-moons").innerText =
    body.moons.length > 0 ? body.moons.join(", ") : "Inga månar";

  // Ändra färgen på planetindikatorn
  if (planetIndicator) {
    planetIndicator.style.backgroundColor = planetColors[body.name] || "#ffffff";
  }

  // Visa overlay
  overlay.classList.add("visible");
  document.body.classList.add("overlay-visible");

  // Lägg till stäng-knappen
  document.getElementById("close-overlay").addEventListener("click", () => {
    overlay.classList.remove("visible");
    document.body.classList.remove("overlay-visible");
    if (planetIndicator) {
      planetIndicator.style.backgroundColor = "";
    }
  });
};

// Initiera sidan
const init = async () => {
  await fetchApiKey();
  await fetchPlanets();
};

init();