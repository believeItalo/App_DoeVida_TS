import React from 'react';
import { View, Text, Image } from 'react-native';

const CustomDrawerHeader = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
      <Image
        source={require('./caminho-para-a-imagem-do-usuario.jpg')}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <Text style={{ marginLeft: 12, fontSize: 20 }}>Nome do Usuário</Text>
    </View>
  );
};

export default CustomDrawerHeader;
