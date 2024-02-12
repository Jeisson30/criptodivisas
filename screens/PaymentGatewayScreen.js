import React from 'react';
import { View, Text, Button } from 'react-native';

function PaymentGatewayScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla de pago</Text>
      <Button
        title="IR A crear"
        onPress={() => navigation.navigate('CreatePayment')}
      />
    </View>
  );
}

export default PaymentGatewayScreen;
