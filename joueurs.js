import {
    validerDonneesJoueur
} from "./Validation.js";

import {
    fenetreFormulaire,
    formulaireJoueurs,
    listeJoueurs,
    compteurJoueurs,
    champNom,
    champNumero,
    boutonOuverture,
    boutonsFermeture,
    titreFormulaire,
    boutonAjouter,
    afficherErreur,
    effacerErreur,
    age
} from "./interface.js";

import {
    chargerJoueurs,
    sauvegarderJoueurs
} from "./stockage.js";

let joueurs = chargerJoueurs();
let indexJoueurAModifier = null;

export const afficherJoueurs = () => {
    listeJoueurs.replaceChildren();

    joueurs.forEach((joueur, index) => {
        const carte = document.createElement("div");
        carte.className = "rounded-xl w-full border-l border-pink-300 bg-gray-700 p-3 mt-2";

        const contenu = document.createElement("div");
        contenu.className = "flex items-center gap-3";

        const numero = document.createElement("span");
        numero.className = "rounded-full border border-pink-300 h-9 w-9 flex items-center justify-center text-white";
        numero.textContent = joueur.numero;

        const informations = document.createElement("div");
        informations.className = "flex-1 min-w-0";

        const nom = document.createElement("h3");
        nom.className = "text-white break-words";
        nom.textContent = joueur.nom;

        const poste = document.createElement("p");
        poste.className = "text-pink-300 text-sm";
        poste.textContent = joueur.poste;

        const ageJoueur = document.createElement("p");
        ageJoueur.className = "text-gray-900 text-xl";
        ageJoueur.textContent = joueur.age;

        const statut = document.createElement("p");
        statut.className = joueur.statut === "EN FORME"
            ? "text-blue-100 text-sm"
            : "text-pink-200 text-sm";
        statut.textContent = joueur.statut;

        const boutonModifier = document.createElement("button");
        boutonModifier.type = "button";
        boutonModifier.textContent = "🖊️";
        boutonModifier.className = "text-white cursor-pointer text-lg p-1";
        boutonModifier.setAttribute("aria-label", `Modifier ${joueur.nom}`);
        boutonModifier.addEventListener("click", () => modifierJoueur(index));

        const boutonSupprimer = document.createElement("button");
        boutonSupprimer.type = "button";
        boutonSupprimer.textContent = "🗑️";
        boutonSupprimer.className = "text-white cursor-pointer text-lg p-1";
        boutonSupprimer.setAttribute("aria-label", `Supprimer ${joueur.nom}`);
        boutonSupprimer.addEventListener("click", () => supprimerJoueur(index));

        informations.append(nom, poste, ageJoueur, statut);
        contenu.append(numero, informations, boutonModifier, boutonSupprimer);
        carte.append(contenu);
        listeJoueurs.append(carte);
    });

    compteurJoueurs.textContent = joueurs.length === 1
        ? "1 joueur"
        : `${joueurs.length} joueurs`;
};

const modifierJoueur = (index) => {
    const joueur = joueurs[index];

    indexJoueurAModifier = index;
    champNom.value = joueur.nom;
    champNumero.value = joueur.numero;
    age.value = joueur.age;

    document.getElementById("statut-joueur").value = joueur.statut || "En forme";

    const posteSelectionne = formulaireJoueurs.querySelector(
        `input[name="poste-joueur"][value="${joueur.poste}"]`
    );

    if (posteSelectionne) {
        posteSelectionne.checked = true;
    }

    titreFormulaire.textContent = "Modifier un joueur";
    boutonAjouter.textContent = "Enregistrer";
    effacerErreur();

    fenetreFormulaire.classList.add("ouverte");
    fenetreFormulaire.setAttribute("aria-hidden", "false");
    champNom.focus();
};

const supprimerJoueur = (index) => {
    const joueur = joueurs[index];

    if (!confirm(`Voulez-vous vraiment supprimer ${joueur.nom} ?`)) {
        return;
    }

    joueurs.splice(index, 1);
    sauvegarderJoueurs(joueurs);
    afficherJoueurs();
};

const reinitialiserFormulaire = () => {
    formulaireJoueurs.reset();
    indexJoueurAModifier = null;
    titreFormulaire.textContent = "Ajouter un joueur";
    boutonAjouter.textContent = "Ajouter";
    effacerErreur();
};

const ouvrirFormulaire = () => {
    reinitialiserFormulaire();
    fenetreFormulaire.classList.add("ouverte");
    fenetreFormulaire.setAttribute("aria-hidden", "false");
    champNom.focus();
};

const fermerFormulaire = () => {
    fenetreFormulaire.classList.remove("ouverte");
    fenetreFormulaire.setAttribute("aria-hidden", "true");
    reinitialiserFormulaire();
};

boutonOuverture.addEventListener("click", ouvrirFormulaire);

boutonsFermeture.forEach(bouton => {
    bouton.addEventListener("click", fermerFormulaire);
});

formulaireJoueurs.addEventListener("submit", evenement => {
    evenement.preventDefault();

    const nom = champNom.value.trim();
    const numero = Number(champNumero.value);

    const posteSelectionne = formulaireJoueurs.querySelector(
        'input[name="poste-joueur"]:checked'
    );

    const ageJoueur = Number(age.value);
    const statutJoueur = document.getElementById("statut-joueur").value;

    const erreur = validerDonneesJoueur(
        nom,
        numero,
        posteSelectionne,
        joueurs,
        ageJoueur,
        indexJoueurAModifier
    );

    if (erreur) {
        afficherErreur(erreur);
        return;
    }

    const joueurMisAJour = {
        nom: nom,
        numero: numero,
        poste: posteSelectionne.value,
        age: ageJoueur,
        statut: statutJoueur,
        emplacement: indexJoueurAModifier !== null
            ? joueurs[indexJoueurAModifier].emplacement || "banc"
            : "banc"
    };

    if (indexJoueurAModifier !== null) {
        joueurs[indexJoueurAModifier] = joueurMisAJour;
    } else {
        joueurs.push(joueurMisAJour);
    }

    sauvegarderJoueurs(joueurs);
    afficherJoueurs();
    fermerFormulaire();
});
afficherJoueurs();