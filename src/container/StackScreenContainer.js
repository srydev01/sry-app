import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { Login, Registration, Home, Workflows, Products, Admins, AdminView, Profile, WorkflowView, EditProducts } from '../screens';

const Stack = createStackNavigator()

const HomeStackScreen = (user, mainTheme) => {
  //console.log(props);
  return (
    <Stack.Navigator screenOptions={({ route }) => ({
      headerShown: false
    })}>
      <Stack.Screen name='HomeScreen'>{props => <Home {...props} extraData={user} mainTheme={mainTheme} />}</Stack.Screen>
    </Stack.Navigator>
  )
}

const WorkflowsStackScreen = (user, mainTheme) => {
  return (
    <Stack.Navigator screenOptions={({ route }) => ({
      headerShown: false
    })}>
      <Stack.Screen name='WorkflowsScreen'>{props => <Workflows {...props} extraData={user} mainTheme={mainTheme} />}</Stack.Screen>
      <Stack.Screen name='WorkflowViewScreen'>{props => <WorkflowView {...props} extraData={user} mainTheme={mainTheme} />}</Stack.Screen>
    </Stack.Navigator>
  )
}

const ProductsStackScreen = (user, mainTheme) => {
  return (
    <Stack.Navigator screenOptions={({ route }) => ({
      headerShown: false
    })}>
      <Stack.Screen name='ProductsScreen'>{props => <Products {...props} extraData={user} mainTheme={mainTheme} />}</Stack.Screen>
    </Stack.Navigator>
  )
}

const AdminsStackScreen = (user, mainTheme) => {
  return (
    <Stack.Navigator screenOptions={({ route }) => ({
      headerShown: false
    })}>
      <Stack.Screen name='AdminsScreen'>{props => <Admins {...props} extraData={user} mainTheme={mainTheme} />}</Stack.Screen>
      <Stack.Screen name='AdminViewScreen'>{props => <AdminView {...props} extraData={user} mainTheme={mainTheme} />}</Stack.Screen>
      <Stack.Screen name='EditProducts'>{props => <EditProducts {...props} extraData={user} mainTheme={mainTheme} />}</Stack.Screen>
    </Stack.Navigator>
  )
}

const ProfileStackscreen = (user, mainTheme) => {
  return (
    <Stack.Navigator screenOptions={({ route }) => ({
      headerShown: false
    })}>
      <Stack.Screen name='ProfileScreen'>{props => <Profile {...props} extraData={user} mainTheme={mainTheme} />}</Stack.Screen>
    </Stack.Navigator>
  )
}

const AnonymousStackScreen = (mainTheme) => {
  return (
    <Stack.Navigator screenOptions={({ route }) => ({
      headerShown: false
    })}>
      <Stack.Screen name='LoginScreen'>{props => <Login {...props} mainTheme={mainTheme} />}</Stack.Screen>
      <Stack.Screen name='RegistrationScreen'>{props => <Registration {...props} mainTheme={mainTheme} />}</Stack.Screen>
    </Stack.Navigator>
  )
}

export { HomeStackScreen, WorkflowsStackScreen, ProductsStackScreen, AdminsStackScreen, ProfileStackscreen, AnonymousStackScreen }