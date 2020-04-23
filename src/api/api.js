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
        return result.results.map(this._transformPerson);
    }

    async getPerson(id) {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    }

    async getAllPlanets() {
        const result = await this.getResource(`/planets/`);
        return result.results.map(this._transformPlanet);
    }

    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(planet);
    }

    async getAllStarships() {
        const result = await this.getResource(`/starships/`);
        return result.results.map(this._transformStarShip);
    }

    async getStarships(id) {
        const starShip = await this.getResource(`/starships/${id}/`);
        return this._transformStarShip(starShip);
    }

    _extracrId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformPlanet = (planet) => {
        return {
            id: this._extracrId(planet),
            planetName: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    };

    _transformStarShip = (starship) => {
        return {
            id: this._extracrId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    };

    _transformPerson = (person) => {
        return {
            id: this._extracrId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color
        }
    }
}