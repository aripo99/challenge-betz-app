import {
  View,
  Button,
  Text,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import { Alert, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { supabase } from '@/utils/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Sign in with email and password
  const onSignInPress = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  // Create a new user
  const onSignUpPress = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            elevation: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            gap: 10,
          }}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: '#fff', fontSize: 20 }}>Loading...</Text>
        </View>
      )}

      <Text textAlign='center' m='$8' color='#fff' fontSize={30}>Sign In</Text>

      <Text color='#fff'> Email </Text>
      <Input
        variant='outline'
        size='xl'
        my='$2'
      >
        <InputField
          value={email}
          onChangeText={setEmail}
          color='#fff'
          type='text'
        />
      </Input>
      <Text color='#fff'> Password </Text>
      <Input
        variant='outline'
        size='xl'
        my='$2'
      >
        <InputField
          value={password}
          onChangeText={setPassword}
          color='#fff'
          type='password'
        />
      </Input>

      <Button onPress={onSignInPress} my="$3">
        <Text color='#fff'>
          Sign in
        </Text>
      </Button>
      <Text color='#fff'> Don't have an account yet? Sign up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    padding: 20,
    backgroundColor: '#151515',
  },
});

export default Login;