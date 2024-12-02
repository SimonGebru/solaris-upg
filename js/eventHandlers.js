// Denna modul fokuserar på användarinteraktion, lägger till klickhändelser för att hantera interaktionen med planeterna och solen.
// Genom att separera eventhantering från API-anrop och overlay-uppdatering blir koden mer strukturerad och återanvändbar.


import { showOverlay } from "./overlay.js";


export const setupPlanetClickEvents = (bodies) => {
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