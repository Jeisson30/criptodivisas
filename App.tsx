import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreatePaymentScreen from './screens/CreatePaymentScreen';
import PaymentGatewayScreen from './screens/PaymentGatewayScreen';

const Stack = createStackNavigator();

function MainApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreatePayment">
        <Stack.Screen name="CreatePayment" component={CreatePaymentScreen} />
        <Stack.Screen name="PaymentGateway" component={PaymentGatewayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainApp;
