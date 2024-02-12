import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CreatePaymentScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [concept, setConcept] = useState('');

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://payments.pre-bnvo.com/api/v1/currencies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Device-Id': '4c11dd46-0464-4259-805d-1f2e06ce6e38'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch currencies');
        }

        const data = await response.json();
        console.log('Currencies:', data);
        setCurrencies(data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleAmountChange = (text) => {
    setAmount(text);
  };

  const handleCurrencyChange = (itemValue) => {
    setSelectedCurrency(itemValue);
  };

  const handleConceptChange = (text) => {
    setConcept(text);
  };

  const handleContinue = async () => {
    if (!amount) {
      alert('Por favor ingrese el importe.');
      return;
    }
  
    if (!selectedCurrency) {
      alert('Por favor seleccione una criptomoneda.');
      return;
    }
      const selectedCrypto = currencies.find(currency => currency.symbol === selectedCurrency);
  
    if (parseFloat(amount) < parseFloat(selectedCrypto.min_amount)) {
      alert(`El importe mínimo para ${selectedCrypto.name} es ${selectedCrypto.min_amount}.`);
      return;
    }
  
    if (parseFloat(amount) > parseFloat(selectedCrypto.max_amount)) {
      alert(`El importe máximo para ${selectedCrypto.name} es ${selectedCrypto.max_amount}.`);
      return;
    }
      const requestBody = {
      expected_output_amount: parseFloat(amount),
      input_currency: selectedCurrency,
      notes: concept,
      fiat: "EUR",
      language: "ES",
      reference: "your_reference_value",
    };
    
    
    try {
      console.log('enviarrr: ', JSON.stringify(requestBody));

      const response = await fetch('https://payments.pre-bnvo.com/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Device-Id': '4c11dd46-0464-4259-805d-1f2e06ce6e38'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error('Failed to create payment');
      }
  
      const responseData = await response.json();
      console.log('Payment created:', responseData);
    
    } catch (error) {
      console.error('Error creating payment:', error);
      if (error.response) {
        console.error('Response body:', error.response.data);
      }
    }
  };
  
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Crear Pago</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Importe"
        keyboardType="numeric"
        value={amount}
        onChangeText={handleAmountChange}
      />
      <Picker
        selectedValue={selectedCurrency}
        style={{ height: 40, width: 200, marginBottom: 10 }}
        onValueChange={handleCurrencyChange}
      >
        <Picker.Item label="Seleccionar Criptomoneda" value="" />
        {currencies.map((currency) => (
          <Picker.Item
            key={currency.symbol}
            label={currency.name}
            value={currency.symbol}
          >
            <Image
              source={{ uri: currency.image }}
              style={{ width: 40, height: 40 }}
            />
          </Picker.Item>
        ))}
      </Picker>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Concepto"
        value={concept}
        onChangeText={handleConceptChange}
      />
      <Button
        title="Continuar"
        onPress={handleContinue}
      />
    </View>
  );
};

export default CreatePaymentScreen;
