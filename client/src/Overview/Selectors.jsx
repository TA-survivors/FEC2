import React, { useState, useEffect, useContext } from 'react';
import { StyleContext } from './Product.jsx';

var Selectors = () => {
  const { allStyles, currentStyle, dispatch } = useContext(StyleContext);
  // const [stock, setStock] = useState(currentStyle.skus);
  const [currentSku, setCurrentSku] = useState(null)

  const calcAvailable = (styleSkusObj) => {
    // returns total stock of style
    // this will be for whether to fade out the style selector for a style
  }

  const handleAddToBag = () => {
    axios.post('/api/cart', {sku_id: parseInt(currentSku)})
    .then(() => console.log('Added to Cart!')) // fix this later to show cart pop up
    .catch(err => console.error(err))
  }

  const handleAddFavorite = () => {
    // talk to kevin about how he wants to store
    // product_id or style_id???
  }

  const handleSelectSize = (sku) => {
    setCurrentSku(sku);
  }

  useEffect(() => {
    setCurrentSku(null);
  }, [currentStyle])

  const renderStyles = () => {
    return Object.values(allStyles).map((style, index) => {
      return (
        <img
          src={style.photos[0].thumbnail_url}
          alt="n/a"
          className="style"
          id={style.style_id}
          onClick={(e) => dispatch({ type: 'switchCurrentStyle', payload: {id: parseInt(e.target.id)} })}
          key={`${style.style_id}-${index}`}
        ></img>
      )
    })
  }

  const renderSizes = (skus) => {
    let availableSizes = [];
    for (let sku in skus) {
      availableSizes.push(
        <div key={sku}>
          <input
            type="radio"
            id={sku}
            // data={skus[sku].quantity}
            className="visually-hidden"
            name="skuAndSize"
            onClick={(e) => handleSelectSize(e.target.id)}
          ></input>
          <label
            htmlFor={sku}
            style={{ textDecoration: parseInt(currentStyle.skus[sku].quantity) ? "" : "line-through" }}
          >{skus[sku].size}</label>
        </div>
      )
    }
    return availableSizes;
  }

  if (!Object.keys(currentStyle).length) {
    return <div>Loading</div>
  } else {
    return (
      <div className="selectors">
        <div className="style-selector">
          {renderStyles()}
        </div>
        <div className="size-selector">
          size selector
          {renderSizes(currentStyle.skus)}
        </div>
        <button>Add to Bag</button>
        <button>Favorite</button>
      </div>
    )
  }
}

export default Selectors;