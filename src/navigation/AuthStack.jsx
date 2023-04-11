import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/authScreens/Login'
import Signup from '../screens/authScreens/Signup'
import ForgotPass from '../screens/authScreens/ForgotPass'
import AddUserInfo from '../screens/authScreens/AddUserInfo'
import Emaillogin from '../screens/authScreens/Emaillogin'
import RootStack from './RootStack'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="login"
    >
      <Stack.Screen name='signup' component={Signup} />
      <Stack.Screen name='login' component={Login} />
      <Stack.Screen name='emaillogin' component={Emaillogin} />
      <Stack.Screen name='Add' component={AddUserInfo} />
      <Stack.Screen name='forgotPass' component={ForgotPass} />
      <Stack.Screen name='rootstack' component={RootStack} />
    </Stack.Navigator>
  )
}

export default AuthStack
