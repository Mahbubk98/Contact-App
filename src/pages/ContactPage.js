import React, {useEffect, useState, useContext} from 'react';
import { 
    Button, 
    Image, 
    SafeAreaView, 
    SectionList, StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'

import { getContacts } from '../services/ContactService';
import { AppStateContext} from '../providers/AppStateProvider'

const ContactPage = ({navigation}) => { 

    const {contacts} = useContext(AppStateContext)
    const [listData, setListData] = useState(null);

    useEffect(() => {
        if (contacts) {
            const favoriteContacts = contacts.filter((contact) => {
                return contact.isFavorite
            });
            const notFavorite = contacts.filter((contact) => {
                return !contact.isFavorite
            });
            const DATA = [
                {
                  title: "FAVORITE CONTACTS",
                  data: favoriteContacts
                },
                {
                  title: "OTHER CONTACTS",
                  data: notFavorite
                }];
            setListData(DATA)
        }
    }, [contacts])

    return (
            <SectionList
                refreshing={listData==null || listData.length ==0}
                sections={listData}
                keyExtractor={(item, index) => item?.id + index}
                renderItem={({ item }) => <ContactRow contact = {item}/>}
                renderSectionHeader={({ section: { title } }) => (
                    <View> 
                        <Text style={{borderTopWidth: 5, 
                            borderBottomWidth: 5,
                            borderLeftWidth: 5,
                            borderRightWidth: 5, 
                            fontSize: 10, 
                            fontWeight: 'bold', 
                            backgroundColor: 'gainsboro'
                            }}
                            >
                                {title}
                            </Text>
                    </View>
                )}
            />
    
    )
    
    
}
const ContactRow = ({contact}) => {
    const navigation = useNavigation() 
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Details', {contact: contact})}>
            <View style={{ backgroundColor: 'white', borderTopWidth: 1, borderTopColor: 'gainsboro', width:'100%', flexDirection: 'row', padding: 15}}>
                <View>
                <Image
                    style={{margin: 5, width:75, height:75}} 
                    source={{uri:contact.smallImageURL}}/>
                </View>

                <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 15}}>
                    <Text style={{width: 20}}>
                            {contact.isFavorite && '⭐'}
                    </Text>
                    <View>    
                        <Text style={{ fontSize: 20}}>
                                {contact.name}
                        </Text>
                        <Text style={{fontSize: 15, color: 'lightslategray'}}>
                            {contact.companyName}
                        </Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ContactPage