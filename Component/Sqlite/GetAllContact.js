import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { comparer } from 'mobx';
import Contacts from 'react-native-contacts';
export default function GetAllContact() {
    const [contacts, setContacts] = useState([]);
console.log('......................COntact call................................');
    useEffect(async()=>{

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Contacts Permission',
              message: 'This app needs permission to access your contacts.',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Contacts.getAll().then(contacts => {
             setContacts(contacts)
             
            });
          } else {
            console.log('Contacts permission denied');
          }
          InsertContactInTable()
    },[])






 const InsertContactInTable =  () => { 
    
    contacts.forEach(SaveContacts);
    
    
    let PhoneNumber = []

    
 const SaveContacts = (item, index)=>{

    const date = new Date();
        let rtime = d.toLocaleTimeString();
        let fromCountryCode = 91;
        let unreadSms = '';
        let Name = item.displayName;
        let profile = item.thumbnailPath;

        item.phoneNumbers.map(item => {
         PhoneNumber.push({
            phoneNumber:item.number
         })
          });
        db.transaction(async txn => {
          txn.executeSql(
              'INSERT INTO Contacts(countryCode,mobileNumber,contactName,unreadSms,lastUpdated,profileIcon,rtime,CreateDate ) VALUES (?,?,?,?,?,?,?,?)',
             [
              fromCountryCode,
              PhoneNumber.phoneNumber,
              Name,
              unreadSms,
              rtime,
             profile,
              rtime,
              date
            ],
            (tx, res) => {
              if (res.rowsAffected > 0) {
                console.log('contact Added......................');
              }
            },
            er => {
              console.log('errross.....user screen ..');
            },
          );
        });
      }     }
  return(<> 
  

  </>)
}