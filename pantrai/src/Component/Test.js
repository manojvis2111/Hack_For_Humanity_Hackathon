import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ItemInfo = ({ itemName }) => {
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/item/Apple`);
        console.log(response.data);
        setItem(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching item');
      }
    };

    fetchItem();
  }, [itemName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  console.log(item.SVGPathElement);
  return (
    <div>
      <h1>{item.name}</h1>
      {/* console.log(item.SVGFilePathElement); */}
      <img src={'icons/ginger.svg'} style={{ height: '140px', width: '40px' }}/>
      <p>Shelf Life: {new Date(item.shelfLife).toLocaleDateString()}</p>
    </div>
  );
};

export default ItemInfo;