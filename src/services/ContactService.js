import axios from 'axios'

export const getContacts = async () => {
    return await axios.get('https://s3.amazonaws.com/technical-challenge/v3/contacts.json')
}

