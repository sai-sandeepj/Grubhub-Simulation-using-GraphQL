import React, { Component } from 'react';

class LeftPanel extends Component {
    constructor(props){
        super(props)
    }
    
    render() {
        return (
            <div>
               <button onClick={() => this.props.visitCuisine(this.props.cuisineIndividual)} className="list-group-item list-group-item-action" >{this.props.cuisineIndividual} </button>
            </div>
        );
    }
}

export default LeftPanel;