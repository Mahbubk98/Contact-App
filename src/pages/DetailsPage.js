import React, {useContext} from 'react';
import { Button, Image, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import getContacts from '../services/ContactService';
import { AppStateContext} from '../providers/AppStateProvider'

const DetailsPage = ({ navigation }) => {
   
    const route = useRoute()
    const {contact} = route.params;
    const fullAddress = `${contact.address.street}\n${contact.address.city} ${contact.address.state} ${contact.address.country} ${contact.address.zipCode}`
    const {toggleFavorites} = useContext(AppStateContext)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title = {contact.isFavorite ? '⭐'
                    : 'Add To Fav'
            }   onPress =  { () => toggleFavorites(contact.id)}
            />
            )    
        })
    })

    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                {/* <Text> { contact.name } </Text> */}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  width: '100%', height: 300}}>
                {/* Top View */}
                    <View> 
                        <Image
                        style={{width:200, height:200}} 
                        source={{uri:contact.largeImageURL}}/>
                    </View>
                    <Text style={{ fontSize: 30}}>
                        {contact.name}
                    </Text>
                    <Text style={{ fontSize: 15, color: 'gray'}}>
                        {contact.companyName}
                    </Text>
                </View>
                <View style={{ width: '100%', height: 500, paddingLeft: 20, paddingRight: 20}}>
                    <DetailsRow label={'PHONE'} value={contact.phone.home} type={'Home'}/>
                    <DetailsRow label={'PHONE'} value={contact.phone.mobile} type={'Mobile'}/>
                    <DetailsRow label={'PHONE'} value={contact.phone.work} type={'Work'} />
                    <DetailsRow label={'ADDRESS'} value={fullAddress} />
                    <DetailsRow label={'BIRTHDATE'} value={contact.birthdate} />
                    <DetailsRow label={'EMAIL'} value={contact.emailAddress} />
                </View>
            </View>
        </ScrollView>
    );
  }

const DetailsRow = ({contact, children, label, value, type}) => {
    return (
        <View>
            <View style={{borderBottomColor: 'gainsboro', borderBottomWidth:1, marginBottom:20, height:10, width: '100%'}}>

            </View>
            <Text style={{fontWeight:  'bold', color: 'gray'}}>
                    {label}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
                <Text style={{fontWeight: 'bold'}}>
                    {value || children}
                </Text>
                <Text style={{color: 'gray'}}>
                    {type}
                </Text>
            </View>
        </View>
    )
}

export default DetailsPage