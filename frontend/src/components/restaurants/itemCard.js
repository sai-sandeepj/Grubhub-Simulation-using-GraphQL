import React, { Component } from 'react';
import './restHome.css'
import rootUrl from '../config/settings';
import item_image from "../../images/item_defaultimage.jpg"


// var images = require.context('../../../../backend/uploads/', true);

class ItemDisplay extends Component {
    
    render() {
        let unknown
        let { itemId, itemName, itemPrice, itemImage, restId } = this.props.itemIndividual
        if (itemImage){
            unknown =  
            <img src={ rootUrl+'/profile/download-file/' + itemImage} className="card-img-top" id="card-img-top" alt="..." />
        }
        else{
            unknown=
            <img src={item_image} className="card-img-top" id="card-img-top" alt="..." />
        }
        let itemQuantity = ""
        let allQuant = this.props.quantity.Quantity;
        for(let i=0; i<allQuant.length; i++)
        if (this.props.quantity.Quantity[i].itemName == itemName){
            itemQuantity = this.props.quantity.Quantity[i].itemQuantity
            
        }
        
        return (

            <div>
                <div className="itemRight" id="itemRight" >
                    <div className="col-md-3 col-sm-6">
                        <div className="card cardclass" id="cardclass" >
                            {unknown}
                            <div className="card-block" id="card-title-text">
                                <h6 className="card-title" id="card-title">{itemName}</h6>
                                <p className="card-text" id="card-text">${itemPrice}</p>
                                <span>
                                    <button className="btn btn-primary" onClick={() => this.props.handleDecrement(itemName)}> - </button>
                                    <input id="quant-text" type="number" readOnly value= {itemQuantity}   />
                                    <button id="add-button" className="btn btn-primary" onClick={() => this.props.handleIncrement(itemName)} >+</button>
                                </span>
                                <button id="btn-item-add-to-cart" onClick={() => this.props.togglePopup(itemPrice, itemId, restId, itemQuantity)} className="btn btn-success">Add to cart </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ItemDisplay;