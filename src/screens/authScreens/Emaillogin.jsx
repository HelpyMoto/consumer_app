import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Emaillogin = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')

    const validate = () => {
        setErr('')
        if (email === '' || password === '') {
            setErr('*Empty details')
            return false;
        }
        return true;
    }

    const login = async () => {
       
        setLoading(true)
        if (validate()) {
            let data = await fetch(`https://service-provider-apis.onrender.com/api/v1/user/login`, {
                method: "post",
                body: JSON.stringify({ email, password }),
                headers: {
                    'content-type': 'application/json'
                }
            })
            data = await data.json()
            if (data) {
                setLoading(false);
                storeData(data)
                Alert.alert("login successfully")
            }
            else {
                setLoading(true)
            }
        }
        else {
            setLoading(false)
        }
    }


    const storeData = async value => {
        try {
            const Val = JSON.stringify(value);
            await AsyncStorage.setItem('@user_info', Val);
            let data = await AsyncStorage.getItem('@user_info');
            if (data) {
                navigation.replace('rootstack')
            }
        } catch (e) {
            // saving error
            console.log(e);
        }
    };
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled">
                <View style={styles.bannerView}>
                    <Image
                        style={styles.banner}
                        source={require('../../assets/images/icon.png')}
                    />
                </View>
                <Text style={styles.HEADER}>Welcome Back</Text>

                {/* Email login */}

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setEmail(text)}
                        value={email}
                        placeholder="Enter Your Email"
                        placeholderTextColor="grey"
                    />
                    <Text style={{ fontStyle: 'italic' }}>
                        {err}
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        placeholder="Enter Your Password"
                        placeholderTextColor="grey"
                    />
                    <Text style={{ fontStyle: 'italic' }}>
                        {err}
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.btn,
                            {
                                backgroundColor: email && password == '' ? 'grey' : '#5D5FEF',
                            },
                        ]}
                        onPress={login}>
                        {loading ? (
                            <ActivityIndicator color="#ffffff" size={34} />
                        ) : (
                            <Text style={styles.btnText}>Login</Text>
                        )}
                    </TouchableOpacity>
                </View>


                {/* </View> */}
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                    }}>
                    <Text style={{ textAlign: 'center', fontSize: 15, color: '#000' }}>
                        Don't have account?{' '}
                    </Text>
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => navigation.replace('signup')}>
                        <Text style={{ color: '#5D5FEF', fontWeight: '900', fontSize: 16 }}>
                            Create
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.col}>
                    <Text style={{ fontSize: 16, color: 'grey', marginVertical: 20 }}>
                        OR
                    </Text>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="google" size={28} color="#5D5FEF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="facebook" size={28} color="#5D5FEF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="twitter" size={28} color="#5D5FEF" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.col}>
                    <Text style={{ fontSize: 16, color: 'grey', marginVertical: 20 }}>
                        OR
                    </Text>
                    <View style={styles.row}>
                        <Text style={{ textAlign: 'center', fontSize: 15, color: '#000' }}>
                            Login with Otp?{' '}
                        </Text>
                        <TouchableOpacity
                            style={{ alignItems: 'center' }}
                            onPress={() => navigation.replace('login')}
                        >
                            <Text style={{ color: '#5D5FEF', fontWeight: '900', fontSize: 16 }}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Emaillogin;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        width: '100%',
    },
    banner: {
        height: 200,
        width: 150,
        marginBottom: 20,
    },
    HEADER: {
        fontSize: 24,
        fontWeight: '900',
        color: '#5D5FEF',
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    input: {
        height: 50,
        width: '100%',
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#5D5FEF',
        borderRadius: 10,
        color: '#000000',
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 18,
    },
    btn: {
        width: '90%',
        height: 50,
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
        width: '100%',
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
        borderColor: '#5D5FEF',
        borderWidth: 1,
        padding: 5,
        borderRadius: 27,
        height: 40,
        width: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
    },
});


