// Denna modul fokuserar enbart på att kommunicera med API:et, hämtar API-nyckel och data från API:et
// Genom att separera API-anropen håller jag min kod ren och gör det enklare att felsöka eller uppdatera API-relaterad logik i framtiden.


const baseUrl = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com";


export const fetchApiKey = async () => {
  try {
    const response = await fetch(`${baseUrl}/keys`, { method: "POST" });
    const data = await response.json();
    return data.key; // Returnerar API-nyckeln
  } catch (error) {
    console.error("Failed to fetch API key:", error);
    throw new Error("Could not fetch API key");
  }
};


export const fetchBodies = async (apiKey) => {
  try {
    const response = await fetch(`${baseUrl}/bodies`, {
      method: "GET",
      headers: { "x-zocom": apiKey },
    });
    const data = await response.json();
    return data.bodies; // Returnerar alla himlakroppar
  } catch (error) {
    console.error("Failed to fetch bodies:", error);
    throw new Error("Could not fetch celestial bodies");
  }
};