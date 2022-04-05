import React, {useState,useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

export const NuevoCliente = ({navigation,route}) => {
  //campos formularios
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [alerta, setAlerta] = useState(false);
  const {setConsultarApi} = route.params;


  //detectar si estamos editando o nombre


  useEffect(() => {
      if (route.params.cliente) {
        const {nombre, telefono, correo, empresa} = route.params.cliente;
        setNombre(nombre);
        setTelefono(telefono);
        setCorreo(correo);
        setEmpresa(empresa);
      }
  
  }, [])
  

  //Almacena el cliente en la base de datos

  const guardarCliente = async () => {
    //validar

    if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
      setAlerta(true);
      return;
    }

    //generar el cliente

    const cliente = {nombre, telefono, correo, empresa};
    console.log(cliente);

    //Si estamos editando o creando un nuevo cliente
    if (route.params.cliente) {
      const {id} = route.params.cliente;
      cliente.id = id;
      const url = `http://10.0.2.2:3000/clientes/${id}` 
      try {
        await axios.put(url, cliente);


      } catch (error) {

        console.log(error);
      }

     
    }else{

      try {
        //para android
        await axios.post('http://10.0.2.2:3000/clientes', cliente);
  
        //para ios
        // await axios.post('http://localhost:3000/clientes',cliente);
      } catch (error) {
        console.log(error);
      }
    
      
    }


    //redireccionar
    navigation.navigate('Inicio');


    //limpiar el form (opcional)
    setNombre('');
    setTelefono('');
    setCorreo('');
    setEmpresa('');

    //cambiar a true para traernos nuesvos clientes
    setConsultarApi(true);

  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{(route.params.cliente) ? 'Editando Cliente' : 'Añadir Nuevo Cliente'}</Headline>

      <TextInput
        label="Nombre"
        placeholder="Escribe tu nombre"
        onChangeText={texto => setNombre(texto)}
        value={nombre}
        style={styles.input}
      />
      <TextInput
        label="Teléfono"
        placeholder="(999) 999-9999"
        onChangeText={texto => setTelefono(texto)}
        value={telefono}
        style={styles.input}
      />
      <TextInput
        label="Correo"
        placeholder="correo@correo.com"
        onChangeText={texto => setCorreo(texto)}
        value={correo}
        style={styles.input}
      />

      <TextInput
        label="Empresa"
        placeholder="Nombre Empresa"
        onChangeText={texto => setEmpresa(texto)}
        value={empresa}
        style={styles.input}
      />
      <Button
        icon="pencil-circle"
        mode="contained"
        onPress={() => guardarCliente()}>
          {(route.params.cliente) ? 'Editar Cliente' : '  Guardar Cliente'}
      
      </Button>
      <Portal>
        <Dialog visible={alerta} onDismiss={() => setAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAlerta(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});
