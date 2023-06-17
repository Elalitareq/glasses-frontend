import { useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'



export function MyCombobox() {
  const [people, setPeople] = useState([]);

    useEffect(()=>{
      const fetchData=async()=>{
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/customer/all`
              );
              const data = await response.json();
              console.log(data.message)
              
              setPeople(data.message)
     
          } catch (error) {
  
            console.log('Error sending data:', error);
          }
      }
      fetchData()
    },[])



  const [selectedPerson, setSelectedPerson] = useState('')
  const [query, setQuery] = useState('')

  const filteredPeople =
  query === ''
    ? people
    : people.filter((person) => {
        return person.company_name.toLowerCase().includes(query.toLowerCase());
      });


  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} placeholder="Enter a Company Name"  className="border border-gray-300 px-2 py-1 rounded"/>
      <Combobox.Options>
  {filteredPeople.map((person) => (
    <Combobox.Option key={person._id} value={person.company_name}   className="cursor-pointer">
      {person.company_name}
    </Combobox.Option>
  ))}
</Combobox.Options>

    </Combobox>
  )
}