import 'react-native-gesture-handler';
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Inicio} from './views/Inicio';
import {NuevoCliente} from './views/NuevoCliente';
import {DetalleCliente} from './views/DetalleCliente';
import { BarraSuperior } from './components/ui/Barra';


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme,Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator();

//Definir el tema de nuesto diseño

const theme ={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#065EBF',
  }
}

console.log(theme.colors.primary);


const App = () => {
  return (
    <>
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio"

        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.surface,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',


        }}
        >
          
          <Stack.Screen name="Inicio" component={Inicio}
          options={({navigation,route}) => ({

            // headerLeft: (props) => <BarraSuperior {...props}
            //                       navigation={navigation}
            //                       route={route}
                            
            //                   />,

          })}
          />

          <Stack.Screen
            name="NuevoCliente"
            component={NuevoCliente}
            options={{
              title: 'Nuevo Cliente',
            }}
          />
          <Stack.Screen
            name="DetalleCliente"
            component={DetalleCliente}
            options={{
              title: 'Detalle Cliente',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
