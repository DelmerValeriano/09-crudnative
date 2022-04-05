import React from 'react';
import { Button } from 'react-native-paper';

export const BarraSuperior = ({navigation,route}) => {

    const handlePress = () => {
        navigation.navigate('NuevoCliente');
    }
  return (
    <Button
        color='#FFF'
        icon='plus-circle'
        onPress={() => handlePress() }
    >
        Cliente
    </Button>
  )
}
