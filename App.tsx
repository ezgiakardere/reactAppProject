import React, { FC, useCallback, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { View, Text, TouchableOpacity, Alert, TextInput, Linking } from 'react-native';



const App: FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>App</Text>
      <WalletBalance />
    </View>
  );
};

export default App;

export const WalletBalance: FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  const handleOpenPhantomWallet = useCallback(async () => {
    try {
      // Tarayıcıda Phantom cüzdanını açılır
      await Linking.openURL('https://phantom.app/');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to open Phantom wallet');
    }
  }, []);

  const getBalance = useCallback(async () => {
    try {
      // Tarayıcıda Phantom cüzdanını açılır
      await handleOpenPhantomWallet();

      // Daha sonra cüzdan adresini alarak işlemler yapılır
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to fetch balance');
    }
  }, [handleOpenPhantomWallet]);

  return (
    <View>
      <TouchableOpacity onPress={getBalance}>
        <Text>Open Phantom Wallet</Text>
      </TouchableOpacity>
      <Text>Balance: {balance !== null ? balance : ''}</Text>
    </View>
  );
};