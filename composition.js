const positions = document.querySelectorAll(".joueur-terrain");

export function afficherJoueursSurTerrain() {
    positions.forEach(position => {
        const codePosition = position.dataset.position;

        const joueur = joueurs.find(
            joueur => joueur.emplacement === codePosition
        );

        const statut = position.querySelector(".statut-joueur");
        const code = position.querySelector(".code-position");

        if (joueur) {
            statut.textContent = `${joueur.numero} - ${joueur.nom}`;
            position.classList.add("occupee");
        } else {
            statut.textContent = "Libre";
            position.classList.remove("occupee");

            if (code) {
                code.style.display = "";
            }
        }
    });
}

afficherJoueursSurTerrain();