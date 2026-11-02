import { sauvegarderMatchs } from "./stockage.js";

export const ajouterMatch = (matchs, match) => {
    matchs.push(match);
    sauvegarderMatchs(matchs);
};

export const modifierMatch = (matchs, index, match) => {
    if (!matchs[index]) {
        return false;
    }

    matchs[index] = match;
    sauvegarderMatchs(matchs);

    return true;
};

export const supprimerMatch = (matchs, index) => {
    if (!matchs[index]) {
        return false;
    }

    matchs.splice(index, 1);
    sauvegarderMatchs(matchs);

    return true;
};