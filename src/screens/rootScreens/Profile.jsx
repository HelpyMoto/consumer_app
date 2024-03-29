import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {profileOptions} from '../../components/data/DATA';
import Icon from 'react-native-vector-icons/AntDesign';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_info');
      if (value !== null) {
        setUser(JSON.parse(value));
        console.log(user);
      }
    } catch (e) {
      // error reading value
      console.log('error', e);
    }
  };

  return (
    <ScrollView 
    style={{flex: 1}}
    >
      {user && (
        <View style={[styles.col, {marginVertical: 35}]}>
          <Image
            style={styles.pic}
            source={require('../../assets/images/logo1.jpg')}
          />
          <Text
            style={{
              fontSize: 22,
              color: '#000',
              fontWeight: 'bold',
              marginTop: 2,
              letterSpacing: 1,
            }}>
            {user.displayName || 'Rohit Barate'}
          </Text>
          <Text style={{fontSize: 14, color: '#000', marginTop: 2}}>
            {user.phoneNumber}
          </Text>
          <Text style={{fontSize: 14, color: '#000', marginTop: 2}}>
            {user.email || 'rohitbarate100@gmail.com'}{' '}
          </Text>
        </View>
      )}

      {profileOptions.map(opt => {
        return (
          <TouchableOpacity key={opt.id} >
          <View style={styles.row}>
            <View style={[styles.col,{alignItems:'flex-start'}]}>
              <Text style={{color:'#000',fontSize:20,fontWeight:'bold'}} >{opt.option}</Text>
              <Text style={{color:'grey',fontSize:14}} >{opt.co_options}</Text>
            </View>
            <Icon name="right" size={20} color="#000" />
          </View>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity onPress={() =>
          auth()
            .signOut()
            .then(() => {
              console.log('sign out');
            })
        } style={styles.BTN}>
        <Text style={styles.btnText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  col: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  pic: {
    height: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    borderBottomColor:'#000',
    borderBottomWidth:0.5,
    marginBottom:10,
    height:60,
    paddingHorizontal:10,
    width:'100%'
  },
  BTN: {
    width: "80%",
    height: 50,
    backgroundColor: "#5D5FEF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 8,
    marginBottom:16,
    alignSelf:'center'
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
