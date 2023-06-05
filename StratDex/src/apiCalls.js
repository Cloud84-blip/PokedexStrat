export function callPokemonapi(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => { return data.results })
        .catch(error => console.log(error))
}