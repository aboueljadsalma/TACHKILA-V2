export const fenetreFormulaire = document.querySelector(".fenetre-formulaire");
export const formulaireJoueurs = document.querySelector("#formulaire-joueurs");
export const listeJoueurs = document.querySelector("#liste-joueurs");
export const compteurJoueurs = document.querySelector("#compteur-joueurs");
export const champNom = document.querySelector("#nom-joueur");
export const champNumero = document.querySelector("#numero-joueur");
export const retourFormulaire = document.querySelector("#retour-formulaire");
export const boutonOuverture = document.querySelector("#ouvrir-formulaire");
export const boutonsFermeture = document.querySelectorAll(".fermer-formulaire");
export const titreFormulaire = document.querySelector("#titre-formulaire");
export const boutonAjouter = formulaireJoueurs.querySelector('button[type="submit"]');
export const age = document.getElementById("age");

export const afficherErreur = (message) => {
    retourFormulaire.textContent = message;
    retourFormulaire.hidden = false;
};

export const effacerErreur = () => {
    retourFormulaire.textContent = "";
    retourFormulaire.hidden = true;
};