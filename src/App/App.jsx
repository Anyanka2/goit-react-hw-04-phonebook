import React, { useEffect, useState } from 'react';
import ContactFrom from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import Filter from '../components/Filter/Filter';
import { Container, Title, SubTitle, Wrapper } from './App.styled';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';



//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
// }
export const App = () => {
  const phoneContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? phoneContacts;
  });
  const [filter, setFilter] = useState('');

  // componentDidUpdate(_, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  //   }

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // removeContact = contactId => {
  //   this.setState(prevState => {
  //     return {
  //       contacts: prevState.contacts.filter(({ id }) => id !== contactId),
  //       filter: '',
  //     };
  //   });
  // };

  // changeFilter = event => {
  //   this.setState({ filter: event.target.value });
  // };

  // addContact = contact => {
  //   const isInContacts = this.state.contacts.some(
  //     ({ name, number }) =>
  //       name.toLowerCase() === contact.name.toLowerCase() ||
  //       contact.number === number
  //   );
  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name, number }) =>
        name.toLowerCase() === contact.name.toLowerCase().trim() ||
        number === contact.number.trim()
    );

    if (isInContacts) {
      Notiflix.Notify.info(
        `${contact.name} or ${contact.number} is already in contacts`
      );
      return;
    }
    //   this.setState(prevState => ({
    //     contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
    //   }));
    // };
    setContacts(prevContacts => [
      { id: nanoid(), ...contact },
      ...prevContacts,
    ]);
  };
  const changeFilter = event => {
    setFilter(event.target.value.trim());
  };
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(normalizedFilter)
    );
  };
  const visibleContacts = getVisibleContacts();

  const removeContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );

    // render() {
    //   const visibleContacts = this.getVisibleContacts();
    //   const { filter } = this.state;
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactFrom onSubmit={addContact} />
        <SubTitle>Contacts</SubTitle>
        {contacts.length > 0 ? (
          <Filter value={filter} onChangeFilter={changeFilter} />
        ) : (
          <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
        )}
        {contacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={removeContact}
          />
        )}
      </Container>
    );
  };
};
