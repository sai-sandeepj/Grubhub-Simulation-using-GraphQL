import React, { Component } from 'react';

class restCuisines extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <button onClick={() => this.props.itemByItemType(this.props.itemTypeIndividual)} className="list-group-item list-group-item-action" >{this.props.itemTypeIndividual} </button>
            </div>
        );
    }
}

export default restCuisines;