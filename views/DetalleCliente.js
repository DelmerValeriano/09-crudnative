import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Headline, Text, Subheading, Button,FAB} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

export const DetalleCliente = ({navigation,route}) => {
  const {setConsultarApi} = route.params;
  const {nombre, telefono, correo, empresa, id} = route.params.item;

  const mostrarConfirmacion = () => {
    Alert.alert('Eliminar Cliente', '¿Está seguro de eliminar este cliente?', [
      {
        text: 'Si, Eliminar',
        onPress: () => eliminarCliente(),
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };

  const eliminarCliente = async () => {
    const url = `http://10.0.2.2:3000/clientes/${id}`;

    try {
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }

    //redireccionar
    navigation.navigate('Inicio');



    //volver a consultar la api 
    setConsultarApi(true);


  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>
        Empresa: <Subheading> {empresa}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Correo: <Subheading> {correo}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Teléfono: <Subheading> {telefono}</Subheading>
      </Text>
      <Button
        style={styles.boton}
        mode="contained"
        icon="cancel"
        onPress={() => mostrarConfirmacion()}>
        Eliminar Cliente
      </Button>
      <FAB
        icon="pencil"
        style={globalStyles.fab}
        onPress={() => navigation.navigate('NuevoCliente', {cliente: route.params.item, setConsultarApi})}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18,
  },
  boton: {
    marginTop: 100,
    backgroundColor: 'red',
  },
});
