import { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';

export function MyComboboxProduct(onSelectedProducts) {
  const [people, setPeople] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/product/all`);
        const data = await response.json();
        console.log(data.message);
        setPeople(data.message);
      } catch (error) {
        console.log('Error sending data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSelection = (value, id) => {
    if (!selectedProducts.some((product) => product.id === id)) {
      setSelectedProducts([...selectedProducts, { id, name: value }]);
    }
    setQuery('');
  };
  

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleDelete = (product) => {
    const updatedProducts = selectedProducts.filter((item) => item.id !== product.id);
    setSelectedProducts(updatedProducts);
  };

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.type.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div>
      <div>
        {selectedProducts.map((product) => (
          <span key={product.id} className="bg-gray-200 px-2 py-1 rounded-full mr-2">
            {product.name}
            <button
              className="ml-2 text-red-600 hover:text-red-800"
              onClick={() => handleDelete(product)}
            >
              X
            </button>
          </span>
        ))}
      </div>
      <Combobox>
        <Combobox.Input
          onChange={handleInputChange}
          placeholder="Enter a type"
          className="border border-gray-300 px-2 py-1 rounded"
        />
        <Combobox.Options>
          {filteredPeople.map((person) => (
            <Combobox.Option
              key={person._id}
              value={person.type}
              onClick={() => handleSelection(person.type, person._id)}
              className="cursor-pointer"
            >
              {person.type}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
