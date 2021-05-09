import React,{createContext, useState, useEffect} from 'react';
import { getContacts } from '../services/ContactService';

export const AppStateContext = createContext({
    contacts:[]
})
export const AppStateProvider = ({children}) => {
    
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        getContactsSaveState()
        }, [null]);

        getContactsSaveState = () => {
            getContacts().then((response) => {
                setContacts(response.data)
            })
        }
    
    const toggleFavorites = (id) => {

        const newContacts = [...contacts]
        const foundIndex = newContacts.findIndex(contact => contact.id == id ) 
            if (foundIndex > -1){
                newContacts[foundIndex].isFavorite = !newContacts[foundIndex].isFavorite
            }
            setContacts(newContacts)
    }

    const removeFavorites = (id) => {

    }

    return (
        <AppStateContext.Provider value= {{
            contacts: contacts, 
            toggleFavorites: toggleFavorites
        }}>
            {children}
        </AppStateContext.Provider>
    )
 }