import React, { Component } from "react";
import './person-details.css';
import SwapiService from "../../api/api";
import ErrorIndicator from "../error-indicator";
import Loader from "../loader";

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updatePerson()
    };

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson();
            console.log(this.props)
        }
    }

    updatePerson() {
        const { personId } = this.props;
        if (!personId) {
            return;
        }

        this.swapiService
            .getPerson(personId)
            .then(this.onPersonLoaded)
            .catch(this.onError);
    };

    onPersonLoaded = (person) => {
        this.setState({
            person,
            error: false,
            loading: false
        });
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    };

    render() {

        const { person, loading, error } = this.state;

        const errorMsg = error ? <ErrorIndicator/> : null;
        const loader = loading ? <Loader/> : null;
        const content =!(loading || error) ? <PersonView preson={person}/> : null;

        return (
            <div className="person-details card">
                { errorMsg}
                { loader }
                { content }
            </div>
        )
    }
};

const PersonView = (state) => {

    const { id, name, gender, birthYear, eyeColor } = state.preson;

  return(
      <React.Fragment>
          <img className="person-image"
               src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

          <div className="card-body">
              <h4>{name}</h4>
              <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                      <span className="term">Gender</span>
                      <span>{gender}</span>
                  </li>
                  <li className="list-group-item">
                      <span className="term">Birth Year</span>
                      <span>{birthYear}</span>
                  </li>
                  <li className="list-group-item">
                      <span className="term">Eye Color</span>
                      <span>{eyeColor}</span>
                  </li>
              </ul>
          </div>
      </React.Fragment>
  );
};


