import React, {useEffect, useState} from 'react';
import {Text, FlatList, View} from 'react-native';
import axios from 'axios';
import {List, Headline, Button, FAB} from 'react-native-paper';
import globalStyles from '../styles/global';

export const Inicio = ({navigation}) => {
  //state de la app
  const [clientes, setClientes] = useState([]);
  const [consultarApi, setConsultarApi] = useState(true);

  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const resulatdo = await axios.get('http://10.0.2.2:3000/clientes');
        setClientes(resulatdo.data);
        setConsultarApi(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (consultarApi) {
      obtenerClientesApi();
    }
  }, [consultarApi]);

  return (
    <View style={globalStyles.contenedor}>
      <Button
        icon="plus-circle"
        onPress={() => navigation.navigate('NuevoCliente', {setConsultarApi})}>
        Nuevo Cliente
      </Button>
      <Headline style={globalStyles.titulo}>
        {clientes.length > 0 ? 'Clientes' : 'Aún no hay Clientes'}
      </Headline>

      <FlatList
        keyExtractor={cliente => cliente.id.toString()}
        data={clientes}
        renderItem={({item}) => (
          <List.Item title={item.nombre} description={item.empresa}
          
            onPress={()=> navigation.navigate("DetalleCliente",{item,setConsultarApi})} />
        )}
      />
      <FAB
        onPress={() => navigation.navigate('NuevoCliente', {setConsultarApi})}
        icon="plus"
        style={globalStyles.fab}
      />
    </View>
  );
};

