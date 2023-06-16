import { useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'

const people = [
  'Wade Cooper',
  'Arlene McCoy',
  'Devon Webb',
  'Tom Cook',
  'Tanya Fox',
  'Hellen Schmidt',
]

export function MyCombobox() {
    useEffect(()=>{
      const fetchData=async()=>{
        try {
            const response = await fetch('http://localhost:8000/api/customer'
              );
     
          console.log(response);
          } catch (error) {
            
            console.log('Error sending data:', error);
          }
      }
      fetchData()
    },[])
  const [selectedPerson, setSelectedPerson] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options>
        {filteredPeople.map((person) => (
          <Combobox.Option key={person} value={person}>
            {person}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}