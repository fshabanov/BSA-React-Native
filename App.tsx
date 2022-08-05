import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './src/components/pages/Home';
import {Contact} from './src/components/pages/Contact';
import DataContextProvider from './src/context/dataContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <DataContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Contact" component={Contact} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataContextProvider>
  );
};

export default App;
