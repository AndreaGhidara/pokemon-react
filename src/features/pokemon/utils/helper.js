export const getIdPokemon = (path) => {
    if (!path) return null;
    const idPokemon = path.split("/").filter(Boolean).pop();
    return idPokemon
}