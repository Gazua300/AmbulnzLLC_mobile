import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Details from './src/pages/Details'
import Home from './src/pages/Home'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from './src/contexts/Provider'

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Provider>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={screenOptions}>

          <Stack.Screen
            name='Home'
            component={Home}
            details='details'
            options={{
              title: 'Sabores'
            }}/>

          <Stack.Screen
            name='Details'
            component={Details}
            options={{
              title: 'Pedido'
            }}/>

        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

const screenOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: 'goldenrod'
  }
}
