document.getElementById("profile").addEventListener("click", (event) => {
    event.stopPropagation();
    profile.classList.toggle("active");
  });
  
  // Fermer le menu déroulant lorsqu'on clique en dehors du menu
  document.addEventListener("click", () => {
    const profile = document.getElementById("profile");
    if (profile.classList.contains("active")) {
      profile.classList.remove("active");
    }
  });