import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

import { addContact, removeContact, filterContact, saveFromLocalStorage } from "./redux/actions";


function App() {
  const store = useSelector(store => store);
  const { contacts, filter } = store;
  const dispatch = useDispatch();

  const firstRender = useRef(true);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("contacts"));
    if (items?.length) {
      dispatch(saveFromLocalStorage(items))
    }
  }, [dispatch]);

  useEffect(() => {
    if(!firstRender.current) {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }
    else {
        firstRender.current = false;
    }
}, [contacts]);

  const onAddContact = ( data ) => { 
    const { name } = data;  
    const isMached = contacts.find(item => item.name.toLowerCase() === name.toLowerCase());
    isMached ? alert(`${name} is already in contacts`) : 
    dispatch(addContact(data))
  };

  const onDeleteContact = (contactId) => {
    dispatch(removeContact(contactId))
  };

  const changeFilter = (e) => {
    dispatch(filterContact(e.target.value));
  };

  const getVisibleContacts = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onAddContact}/>
      <h2>Contacts</h2>
      <Filter onChange={changeFilter}/>
      <ContactList contacts={getVisibleContacts()} onDelete={onDeleteContact} />
    </div>
  );
};

export default App;

// function App() {
//   const [contacts, setContacts] = useState(initialContacts)
//   const [filter, setFilter] = useState("")

  // const firstRender = useRef(true);
  
//   useEffect(() => {
//     const items = JSON.parse(localStorage.getItem("contacts"));
//     if (items?.length) {
//       setContacts(items);
//     }
//   }, []);

//   useEffect(() => {
//     if(!firstRender.current) {
//         localStorage.setItem("contacts", JSON.stringify(contacts));
//     }
//     else {
//         firstRender.current = false;
//     }
// }, [contacts]);

  // const addContact = ( {name, number} ) => {    
  //   const isMached = contacts.find(item => item.name.toLowerCase() === name.toLowerCase());
  //   const newContact = {
  //     id: nanoid(),
  //     name,
  //     number
  //   };

//     isMached ? alert(`${name} is already in contacts`) : 
//       setContacts(prevContacts => [...prevContacts, newContact])
//   }

  // const deleteContact = (contactId) => {
  //   setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
  // };
    
  // const changeFilter = (e) => {
  //   setFilter(e.target.value);
  //   console.log(filter)
  // };
    
  // const getVisibleContacts = () => {
  //   if (!filter) {
  //     return contacts;
  //   }

  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(filter.toLowerCase()),
  //   );
  // };

  // return (
  //   <Provider store={store}>
  //     <div>
  //       <h1>Phonebook</h1>
  //       <ContactForm onSubmit={addContact}/>
  //       <h2>Contacts</h2>
  //       <Filter value={filter} onChange={changeFilter}/>
  //       <ContactList contacts={getVisibleContacts()} onDelete={deleteContact} />
  //     </div>
  //   </Provider>
  // );
// }

// export default App;