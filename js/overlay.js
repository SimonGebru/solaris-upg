// Denna modul fokuserar på att enbart hantera overlay-relaterad funktionalitet. Hanterar visningen och uppdateringen av overlay-fönstret med information om himlakroppar.
// Genom att separera overlay-logik från eventhantering och API-anrop blir det enklare att uppdatera eller justera overlay-design och funktionalitet.


// Planet colors
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
  
  
  export const showOverlay = (body) => {
    const overlay = document.getElementById("planet-overlay");
    const planetIndicator = document.querySelector(".planet-indicator");
  
    
    document.getElementById("overlay-title").innerText = body.name;
    document.getElementById("overlay-latin-name").innerText = body.latinName;
    document.getElementById("overlay-description").innerText = body.desc;
    document.getElementById("overlay-circumference").innerText = `${body.circumference} km`;
    document.getElementById("overlay-distance").innerText = `${body.distance} km`;
    document.getElementById("overlay-max-temp").innerText = `${body.temp.day}°C`;
    document.getElementById("overlay-min-temp").innerText = `${body.temp.night}°C`;
    document.getElementById("overlay-moons").innerText =
      body.moons.length > 0 ? body.moons.join(", ") : "Inga månar";
  
    
    if (planetIndicator) {
      planetIndicator.style.backgroundColor = planetColors[body.name] || "#ffffff";
    }
  
    overlay.classList.add("visible");
    document.body.classList.add("overlay-visible");
  
    
    document.getElementById("close-overlay").addEventListener("click", () => {
      overlay.classList.remove("visible");
      document.body.classList.remove("overlay-visible");
      if (planetIndicator) {
        planetIndicator.style.backgroundColor = ""; // Reset color
      }
    });
  };