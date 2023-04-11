import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';


const AddUserInfo = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [emailerror, setemailError] = useState('')
  const [passerror, setpassError] = useState('')
  const [phoneerror, setphoneError] = useState('')


  const validate = () => {
    setError('');
    setemailError('');
    setpassError('');
    setphoneError('');
    const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const emailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (firstName === '' || lastName === '' || email === '' || password === '' || phoneNo === '') {
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

  const AddUserInfo = () => {
    if (validate()) {
      console.log(email, password, firstName, lastName, phoneNo)
      console.log('sucess')
    }
    else {
      console.log('err')
      console.log(email, password, firstName, lastName, phoneNo)
    }

  }


  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.form}>
        <Text
          style={{
            color: '#000',
            fontSize: 24,
            fontWeight: 'bold',
            marginVertical: 10,
          }}>
          Add your info
        </Text>
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

        <Text style={{ color: 'grey', fontSize: 12, textAlign: 'left' }}>
          Make sure it matches the name on your government ID.
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={(text) => setPhoneNo(text)}
          value={phoneNo}
          placeholder="phone number"
          keyboardType="numeric"
        />


        {
          phoneerror.length == 0 ? null : <Text style={{ fontStyle: 'italic' }}>{phoneerror} </Text>
        }

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

        {
          emailerror.length == 0 ? null : <Text style={{ fontStyle: 'italic' }}>{emailerror} </Text>
        }

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

        {
          passerror.length == 0 ? null : <Text style={{ fontStyle: 'italic' }}>{passerror} </Text>
        }

        {
          error.length == 0 ? null : <Text style={{ fontStyle: 'italic' }}>
            {error}
          </Text>
        }


      </View>
      <Text style={{ color: '#000', fontSize: 16 }}>
        By selecting{' '}
        <Text style={{ fontWeight: 'bold' }}>Agree and continue</Text>, I agree to
        Helpy moto's{' '}
      </Text>
      <TouchableOpacity>
        <Text
          style={{
            textDecorationStyle: 'solid',
            textDecorationColor: '#000',
            textDecorationLine: 'underline',
            color: '#000',
            fontSize: 16,
          }}>
          Term and service,Payments Terms of Service and Nondiscrimination
          Policy, and acknowledge the Privacy Policy.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={AddUserInfo} >
        <Text style={styles.btnText}>Agree and continue</Text>
      </TouchableOpacity>


    </ScrollView>

  );
};

export default AddUserInfo;

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
