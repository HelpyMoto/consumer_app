import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import io from 'socket.io-client';


const socket = io('http://localhost:3000'); //replace with your server URL


const Signup = ({ navigation }) => {
  const [actCreated, setActCreated] = useState(false);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [model, setModel] = useState('')

  const [error, setError] = useState('')
  const [emailerror, setemailError] = useState('')
  const [passerror, setpassError] = useState('')
  const [phoneerror, setphoneError] = useState('')

  const [err1, setErr1] = useState('');

  const [latitude, setLatitude] = useState('')
  const [longitube, setLongitube] = useState('')

  useEffect(() => {
    location();
  })

  function location() {
    Geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude)
      setLongitube(position.coords.longitude)
      if (latitude && longitube) {
        sendCoordinates(latitude, longitube)
      }
    })
  }

  const sendCoordinates = (latitude, longitude) => {
    socket.emit('coordinates', { latitude, longitude });
    console.log(latitude, longitube)
  }

  const validate = () => {
    setError('');
    setemailError('')
    setpassError('');
    setphoneError('')
    const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const emailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (firstName === '' || lastName === '' || email === '' || password === '' || phoneNo === '' || confirm === '') {
      setError('Empty details')
      return false;
    }
    else if (!emailformat.test(email)) {
      setemailError('Invailed Email')
      return false;
    }
    else if (phoneNo.length < 10) {
      setphoneError("Invailed Number")
      return false;
    }
    else if (password.length < 8) {
      setpassError('*Password must contain at least 8 characters')
      return false;
    }
    else if (!passformat.test(password)) {
      setpassError("*Password must include Special charter")
      return false;
    }
    return true;
  }


  const Signup = async () => {
    if (validate()) {
      if (password === confirm) {
        let data = await fetch(`https://service-provider-apis.onrender.com/api/v1/user/signup`, {
          method: 'post',
          body: JSON.stringify({ firstName, lastName, phoneNo, email, password }),
          headers: {
            'content-type': 'application/json'
          }
        })
        data = await data.json();
        if (data.success === true) {
          setActCreated(true)
          Alert.alert('Signup successfully');
        }
        else {
          Alert.alert('Signup failed');
        }
      }
      else {
        Alert.alert('Password doesnot matched');
      }
    }
  }

  const validateVehile = () => {
    setErr1('')
    if (vehicle === '' || model === '') {
      setErr1("*Empty details")
      return false
    }
    return true;
  }

  const Addcar = () => {
    if (validateVehile()) {
      console.log(vehicle, model)
      console.log("fine")
    }
    else {
      console.log('err')
    }
  }

  function getLocation() {
    if (navigator.Geolocation) {
      navigator.Geolocation.watchPosition(showPosition);
    } else {
      console.log("error")
    }
  }

  function showPosition(position) {
    setLatitude(position.coords.latitude)
    console.log(latitude)
  }


  const SelectCar = () => {
    return (
      <View style={[styles.container, { paddingTop: 20 }]}>
        <Text style={styles.HEADER}>Select your vehicle </Text>
        <View style={[styles.form, { marginTop: 0, paddingHorizontal: 20 }]}>
          <Text
            style={{ alignSelf: 'flex-start', fontWeight: '800', marginTop: 10 }}>
            Vehicle maker :{' '}
          </Text>
          <TextInput
            style={[styles.input, { width: '100%' }]}
            onChangeText={(text) => setVehicle(text)}
            value={vehicle}
            placeholder="car maker e.g. Maruti suzuki"
            keyboardType="default"
          />


          {
            err1.length == 0 ? null : <Text style={{ fontStyle: 'italic' }}>
              {err1}
            </Text>
          }

          <Text
            style={{ alignSelf: 'flex-start', fontWeight: '800', marginTop: 10 }}>
            Vehicle model :{' '}
          </Text>
          <TextInput
            style={[styles.input, { width: '100%' }]}
            onChangeText={(text) => setModel(text)}
            value={model}
            placeholder="car maker e.g. Alto"
            keyboardType="default"
          />

          {
            err1.length == 0 ? null : <Text style={{ fontStyle: 'italic' }}>
              {err1}
            </Text>
          }

          <TouchableOpacity
            style={[styles.btn, { width: '100%' }]}
            onPress={Addcar}>
            <Text style={styles.btnText}>Add Car</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            marginTop: 10,
            height: 1,
            backgroundColor: '#5d5fef',
          }}
        />
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text style={{ fontStyle: 'italic', color: '#ff0212' }}>
            *select vehicle from below list
          </Text>
        </ScrollView>
      </View>
    );
  };

  // root component

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}>
      {actCreated ? (
        <SelectCar />
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          <View style={styles.bannerView}>
            <Image
              style={styles.banner}
              source={require('../../assets/images/icon.png')}
            />
          </View>
          <Text style={styles.HEADER}>Welcome</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
              placeholder="first name"
            />
            {
              error.length == 0 ? null : <Text style={{ fontStyle: 'italic' }}>
                {error}
              </Text>
            }

            <TextInput
              style={styles.input}
              onChangeText={(text) => setLastName(text)}
              value={lastName}
              placeholder="last name"
            />

            {
              error.length == 0 ? null : <Text style={{ fontStyle: 'italic' }}>
                {error}
              </Text>
            }

            <TextInput
              style={styles.input}
              onChangeText={(text) => setPhoneNo(text)}
              value={phoneNo}
              placeholder="phone number"
              keyboardType="numeric"
            />


            <Text style={{ fontStyle: 'italic' }}>
              {phoneerror}
            </Text>
            {
              error.length == 0 ? null : <Text style={{ fontStyle: 'italic' }}>
                {error}
              </Text>
            }

            <TextInput
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email"
            />


            <Text style={{ fontStyle: 'italic' }}>
              {emailerror}
            </Text>
            {
              error.length == 0 ? null : <Text style={{ fontStyle: 'italic' }}>
                {error}
              </Text>
            }


            <TextInput
              style={styles.input}
              placeholder="password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />

            <Text style={{ fontStyle: 'italic' }}>
              {passerror}
            </Text>
            {
              error.length == 0 ? null : <Text style={{ fontStyle: 'italic' }}>
                {error}
              </Text>
            }


            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',

              }}
            >
              <Text
                style={{
                  color: '#5d5fefd4',
                  fontWeight: '900',
                  letterSpacing: 1,
                  marginBottom: 10,
                }}>
                forgot password
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setConfirm(text)}
              value={confirm}
              placeholder="confirm password"
            />

            {
              error.length == 0 ? null : <Text style={{ fontStyle: 'italic' }}>
                {error}
              </Text>
            }

            <TouchableOpacity
              style={styles.btn}
              onPress={Signup} >
              <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{ textAlign: 'center', fontSize: 15, color: '#000' }}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => navigation.replace('login')}>
              <Text style={{ color: '#5D5FEF', fontWeight: '900', fontSize: 16 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={styles.col}
          >
            <Text style={{ fontSize: 16, color: 'grey', marginVertical: 20 }}>OR</Text>
            <View
              style={styles.row}
            >
              <TouchableOpacity style={styles.icon}>
                <Icon name='google' size={28} color="#5D5FEF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <Icon name="facebook" size={28} color="#5D5FEF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <Icon name="twitter" size={28} color="#5D5FEF" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  bannerView: {
    marginVertical: 10,
  },
  banner: {
    height: 200,
    width: 150,
    marginBottom: 20
  },
  HEADER: {
    fontSize: 24,
    fontWeight: '900',
    color: '#5D5FEF',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  input: {
    height: 50,
    width: '90%',
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#5D5FEF',
    borderRadius: 10,
  },
  btn: {
    width: '90%',
    height: 50,
    backgroundColor: '#5D5FEF',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'

  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    width: '100%',

  },
  icon: {
    borderColor: "#5D5FEF",
    borderWidth: 1,
    padding: 5,
    borderRadius: 27,
    height: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15
  }
});
