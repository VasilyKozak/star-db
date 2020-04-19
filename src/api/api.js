export default class SwapiService {

    _apiBase = 'https://swapi.dev/api';

    async getResource(URL) {
        const result = await fetch(`${this._apiBase}${URL}`);
        if (!result.ok) {
            throw new Error(`Could not fetch ${URL}, received ${result.status}`)
        }
        return await result.json();
    }

    async getAllPeople() {
        const result = await this.getResource(`/people/`);
        return result.results;
    }

    getPerson(id) {
        return this.getResource(`/people/${id}/`)
    }

    async getAllPlanets() {
        const result = await this.getResource(`/planets/`);
        return result.results;
    }

    getPlanet(id) {
        return this.getResource(`/planets/${id}/`)
    }

    async getAllStarships() {
        const result = await this.getResource(`/starships/`);
        return result.results;
    }

    getStarships(id) {
        return this.getResource(`/starships/${id}/`)
    }
}