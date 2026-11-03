export const optionsEmplacements = [
    { valeur: "banc", texte: "Sur le banc" },
    { valeur: "GB", texte: "GB - Gardien" },
    { valeur: "DG", texte: "DG - Défenseur gauche" },
    { valeur: "DC1", texte: "DC - Défenseur central 1" },
    { valeur: "DC2", texte: "DC - Défenseur central 2" },
    { valeur: "DD", texte: "DD - Défenseur droit" },
    { valeur: "MG", texte: "MG - Milieu gauche" },
    { valeur: "MC1", texte: "MC - Milieu central 1" },
    { valeur: "MC2", texte: "MC - Milieu central 2" },
    { valeur: "MD", texte: "MD - Milieu droit" },
    { valeur: "BU1", texte: "BU - Buteur 1" },
    { valeur: "BU2", texte: "BU - Buteur 2" }
];

export const postesCompatibles = {
    Gardien: ["GB"],
    Défenseur: ["DG", "DC1", "DC2", "DD"],
    Milieu: ["MG", "MC1", "MC2", "MD"],
    Attaquant: ["BU1", "BU2"]
};

export const validerDonneesJoueur = (
    nom,
    numero,
    posteSelectionne,
    joueurs,
    age,
    indexJoueurAModifier
) => {
    if (
        !nom ||
        !Number.isInteger(numero) ||
        numero < 1 ||
        numero > 99 ||
        !posteSelectionne
    ) {
        return "Vérifiez le nom, le poste et le numéro (de 1 à 99).";
    }

    if (
        joueurs.some((joueur, index) =>
            joueur.numero === numero &&
            index !== indexJoueurAModifier
        )
    ) {
        return "Ce numéro est déjà attribué à un joueur.";
    }

    return null;
};