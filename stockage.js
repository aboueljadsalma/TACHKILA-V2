import { joueursParDefaut } from "./donnees-initiales.js";

export const chargerJoueurs = () => {
    const joueursEnregistres = localStorage.getItem("joueurs");

    return joueursEnregistres
        ? JSON.parse(joueursEnregistres)
        : [...joueursParDefaut];
};

export const sauvegarderJoueurs = (joueurs) => {
    localStorage.setItem("joueurs", JSON.stringify(joueurs));
};