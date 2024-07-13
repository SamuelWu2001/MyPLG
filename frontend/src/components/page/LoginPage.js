import React, { useState } from 'react';
import axiosJWT from '../../utils/axiosJWT';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';


const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axiosJWT.post('/auth/login', {
        username,
        password,
      });
      const { access_token } = response.data;
      await AsyncStorage.setItem('token', access_token);
      setUsername(''); 
      setPassword(''); 
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../../assets/images/icon.png')} style={styles.logo} />
      </View>
      <View style={styles.form}>
        {/* <Text style={styles.title}>LOG IN</Text> */}
        <Text style={styles.subtitle}>會員登入</Text>
        <TextInput
          style={styles.input}
          placeholder="輸入帳號"
          placeholderTextColor="#888"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="輸入密碼"
          placeholderTextColor="#888"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.buttonText}>登入</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPassword}>忘記密碼</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  form: {
    flex: 2,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  forgotPassword: {
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginPage;
