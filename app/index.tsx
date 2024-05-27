import {
  View,
  Button,
  Text,
  Input,
  InputField,
  Pressable,
  HStack,
} from '@gluestack-ui/themed';
import { Alert, StyleSheet } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { supabase } from '@/utils/supabase';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [onSignUp, setOnSignUp] = useState(false);

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
      options: { data: { display_name: name } },
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text textAlign='center' m='$8' color='#fff' fontSize={30}>{onSignUp ? 'Sign Up' : 'Sign In'}</Text>

      {onSignUp && (
        <>
          <Text color='#fff'> Name </Text>
          <Input
            variant='outline'
            size='xl'
            my='$2'
          >
            <InputField
              value={name}
              onChangeText={setName}
              color='#fff'
              type='text'
            />
          </Input>
        </>
      )}

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

      {onSignUp ? (
        <Button onPress={onSignUpPress} my='$3'>
          <Text color='#fff'>
            Sign up
          </Text>
        </Button>
      ) :
        <Button onPress={onSignInPress} my="$3">
          <Text color='#fff'>
            Sign in
          </Text>
        </Button>
      }

      <HStack>
        <Text color='#fff' mt='$2'>
          {onSignUp ? (
            <>
              Already have an account?{' '}
              <Pressable onPress={() => setOnSignUp(false)}>
                <Text color='#fff' underline mt='$2'>Sign in</Text>
              </Pressable>
            </>
          ) : (
            <>
              Don't have an account yet?{' '}
              <Pressable onPress={() => setOnSignUp(true)}>
                <Text color='#fff' underline>Sign up</Text>
              </Pressable>
            </>
          )}
        </Text>
      </HStack>
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