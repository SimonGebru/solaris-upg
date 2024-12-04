// Denna modul fungerar som applikationens "kontroller", Initierar applikationen och kopplar ihop alla moduler.
// Genom att separera initialisering från specifika funktioner håller jag `main.js` enkel och tydlig.


import { fetchApiKey, fetchBodies } from "./api.js";
import { setupPlanetClickEvents } from "./eventHandlers.js";


const init = async () => {
  try {
    
    const apiKey = await fetchApiKey();

    
    const bodies = await fetchBodies(apiKey);

    
    setupPlanetClickEvents(bodies);

    console.log("Application initialized successfully");
  } catch (error) {
    console.error("Initialization failed:", error);
  }
};

// Start 
init();