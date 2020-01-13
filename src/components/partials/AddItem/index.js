import React from 'react';
import { Item } from './styled';
import { Link } from 'react-router-dom';

const AddItem = props => {
  let price = '';

  props.data.priceNegotiable ? price = 'Preço Negociável' : price = `R$ ${props.data.price}`;

  return (
    <Item className="addItem">
      <Link to={`/ad/${props.data.id}`}>
        <div className="itemImage">
          <img src={props.data.image} alt="" />
        </div>
        <div className="itemName"> {props.data.title} </div>
        <div className="itemPrice">...</div>
      </Link>
    </Item>
  )
};

export default AddItem;