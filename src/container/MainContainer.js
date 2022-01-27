import 'react-native-gesture-handler';
import React, { Children, useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeStackScreen, WorkflowsStackScreen, ProductsStackScreen, AdminsStackScreen, ProfileStackscreen, AnonymousStackScreen } from './StackScreenContainer'

import firebase from '../database/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Stack = createStackNavigator()
const auth = getAuth()

export default function MainContainer(props) {
  const [user, setUser] = useState(null)
  const [userRef, setUserRef] = useState(null)
  const [mainTheme, SetMainTheme] = useState({
    Color: { backgroundColor: '#930' },
    BGColor: { backgroundColor: '#e8e8f5' },
    ColorLight: { backgroundColor: '#fff9ff' },
    ColorLight2: { backgroundColor: '#ebb' },
    ColorSuccess: { backgroundColor: "#090" },
    ColorFail: { backgroundColor: "#900" },
    Border: { borderColor: '#930', borderStyle: 'solid', borderWidth: 1 },
    Border2: { borderColor: '#930', borderStyle: 'solid', borderWidth: 2 },
    BorderLight: { borderColor: '#fff9ff', borderStyle: 'solid', borderWidth: 1 },
    BorderLight2: { borderColor: '#fff9ff', borderStyle: 'solid', borderWidth: 2 },
    TextColor: { color: '#000' },
    TextColorGrey: { color: '#444' },
    TextColorLight: { color: '#fff' },
    colorInActive: { backgroundColor: '#666' },
    colorTextInActive: { color: '#666' }
  })

  const Tab = createBottomTabNavigator()

  const Home = HomeStackScreen(user, mainTheme)

  /*const mainTheme = {
    Color: { backgroundColor: '#930' },
    BGColor: { backgroundColor: '#e8e8f5' },
    ColorLight: { backgroundColor: '#fff9ff' },
    ColorLight2: { backgroundColor: '#ebb' },
    ColorSuccess: { backgroundColor: "#090" },
    ColorFail: { backgroundColor: "#900" },
    Border: { borderColor: '#930', borderStyle: 'solid', borderWidth: 1 },
    Border2: { borderColor: '#930', borderStyle: 'solid', borderWidth: 2 },
    BorderLight: { borderColor: '#fff9ff', borderStyle: 'solid', borderWidth: 1 },
    BorderLight2: { borderColor: '#fff9ff', borderStyle: 'solid', borderWidth: 2 },
    TextColor: { color: '#000' },
    TextColorGrey: { color: '#444' },
    TextColorLight: { color: '#fff' },
    colorInActive: { backgroundColor: '#666' },
    colorTextInActive: { color: '#666' }
  }*/

  function onAuthChanged(userDoc) {
    if (userDoc) {
      getDoc(doc(firebase, 'users', userDoc.uid)).then(data => {
        getDoc(data.data().theme).then(theme => {
          SetMainTheme(theme.data())
        })
        setUser(data.data())
        setUserRef(data.id)
      })
    } else {
      setUser(null)
    }
  }
  useEffect(() => {
    const authSubScrib = onAuthStateChanged(auth, onAuthChanged)
    return authSubScrib
  }, [])

  return (
    <NavigationContainer>
      {user ? (
        <>
          <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: mainTheme.Color.backgroundColor,
              tabBarInactiveTintColor: mainTheme.colorInActive.backgroundColor,
              tabBarIcon: ({ focused, color, size }) => {
                let rn = route.name
                if (rn == 'Home') {
                  return <Ionicons
                    name='home'
                    size={size}
                    color={focused ? mainTheme.Color.backgroundColor : mainTheme.colorInActive.backgroundColor}
                  />
                } else if (rn == 'Admins') {
                  return <FontAwesome5
                    name='users-cog'
                    size={size}
                    color={focused ? mainTheme.Color.backgroundColor : mainTheme.colorInActive.backgroundColor}
                  />
                } else if (rn == 'Profile') {
                  return <FontAwesome
                    name='user-circle'
                    size={size}
                    color={focused ? mainTheme.Color.backgroundColor : mainTheme.colorInActive.backgroundColor}
                  />
                } else if (rn == 'Products') {
                  return <MaterialIcons
                    name='fact-check'
                    size={size}
                    color={focused ? mainTheme.Color.backgroundColor : mainTheme.colorInActive.backgroundColor}
                  />
                }
                else if (rn == 'Workflows') {
                  return <MaterialCommunityIcons
                    name='clipboard-flow'
                    size={size}
                    color={focused ? mainTheme.Color.backgroundColor : mainTheme.colorInActive.backgroundColor}
                  />
                }
              },
              tabBarStyle: {
                backgroundColor: '#fff',
                paddingBottom: 5
              },
              tabBarLabelStyle: {
                fontWeight: 'bold'
              }
            })}
          >
            <Tab.Screen
              name='Home'
              children={() => HomeStackScreen(user, mainTheme)}
            />
            <Tab.Screen
              name='Workflows'
              children={() => WorkflowsStackScreen(user, mainTheme)}
            />
            <Tab.Screen
              name='Products'
              children={() => ProductsStackScreen(user, mainTheme)}
            />
            <Tab.Screen
              name='Admins'
              children={() => AdminsStackScreen(user, mainTheme)}
            />
            <Tab.Screen
              name='Profile'
              children={() => ProfileStackscreen(user, mainTheme)}
            />
          </Tab.Navigator>
        </>
      ) : (
        <>
          {AnonymousStackScreen(mainTheme)}
        </>
      )}
    </NavigationContainer>
  )
}