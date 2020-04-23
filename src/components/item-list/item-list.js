import React, { Component } from "react";
import './item-list.css';
import SwapiService from "../../api/api";
import Loader from "../loader";

export default class ItemList extends Component {

    swapiService = new SwapiService();

    state = {
      peopleList: null
    };

    componentDidMount() {
        this.swapiService
            .getAllPeople()
            .then((peopleList) => {
                this.setState({
                    peopleList
                });
            });
    };

    renderItems(arr) {
        return arr.map(({name, id}) => {
           return(
               <li className='list-group-item'
                   key={id}
                   onClick={() => this.props.OnItemSelected(id)}>
                   {name}
               </li>
           );
        });
    };

    render() {
        const { peopleList } = this.state;

        if (!peopleList) {
            return <Loader/>;
        }

        const items = this.renderItems(peopleList);

        return (
           <ul className="item-list list-group">
               {items}
           </ul>
       );
   };
};


