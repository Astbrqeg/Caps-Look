import React from "react";


function PriceFilter({ filters, setFilters }) {
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(100);

  function handleMinPriceChange(event) {
    setMinPrice(event.target.value);
  }

  function handleMaxPriceChange(event) {
    setMaxPrice(event.target.value);
  }


  React.useEffect(() => {
    setFilters({
      minPrice,
      maxPrice
    });
  }, [minPrice, maxPrice, setFilters]);

  return (

    <form className="filterContainer">
      <label>
        Min price:
        <input
          type="range"
          id="min-price"
          min="0"
          max="100"
          step="5"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        {minPrice}
      </label>
      <br />
      <label>
        Max price:
        <input
          type="range"
          id="min-price"
          min="0"
          max="100"
          step="5"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
        {maxPrice}
      </label>

    </form>
  );
}

export default PriceFilter;