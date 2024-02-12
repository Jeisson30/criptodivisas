import React from 'react';
import { View, Text, Button } from 'react-native';

function CreatePaymentScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla de creacion</Text>
      <Button
        title="Ir a pagar"
        onPress={() => navigation.navigate('PaymentGateway')}
      />
    </View>
  );
}

export default CreatePaymentScreen;
