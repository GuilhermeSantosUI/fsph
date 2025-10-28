import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { Camera, CaretLeft } from 'phosphor-react-native';
import FormInput from '../components/FormInput';

type UserProfile = {
  idade: string;
  tipoSanguineo: string;
  rg: string;
  cpf: string;
  email: string;
  telefone: string;
  endereco: string;
  avatarUrl: string;
};

const fetchUserData = (): Promise<UserProfile> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        idade: '30',
        tipoSanguineo: 'O+',
        rg: '12.345.678-9',
        cpf: '111.222.333-44',
        email: 'guilherme.fsph@email.com',
        telefone: '(79) 99999-8888',
        endereco: 'Rua da Saúde, 123, Aracaju/SE',
        avatarUrl: 'https://placehold.co/100x100',
      });
    }, 1000);
  });
};

export default function ConfiguracoesScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const [idade, setIdade] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetchUserData().then(data => {
      setIdade(data.idade);
      setTipoSanguineo(data.tipoSanguineo);
      setRg(data.rg);
      setCpf(data.cpf);
      setEmail(data.email);
      setTelefone(data.telefone);
      setEndereco(data.endereco);
      setAvatar(data.avatarUrl);
      setIsLoading(false);
    });
  }, []);

  const handleSave = () => {
    console.log('Salvando dados:', { idade, tipoSanguineo, rg, cpf, email, telefone, endereco });
    
    Alert.alert('Sucesso', 'Dados atualizados!', [
      { text: 'OK', onPress: () => router.back() } 
    ]);
  };

  if (isLoading) {
    return (
      <View style={[styles.safeArea, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}> 
      
<Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
          headerShadowVisible: false,
          
          title: 'Dados Pessoais',    
          headerTitleAlign: 'center', 
          
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <CaretLeft size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.profileContainer}>
              <Text style={styles.avatar}>G</Text>
          </View>
          <TouchableOpacity style={styles.avatarEditButton}>
            <Camera size={20} color="#fff" weight="fill" />
          </TouchableOpacity>
        </View>
        
        <FormInput label="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" />
        <FormInput label="Tipo Sanguíneo" value={tipoSanguineo} onChangeText={setTipoSanguineo} />
        <FormInput label="RG" value={rg} onChangeText={setRg} keyboardType="numeric" />
        <FormInput label="CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
        <FormInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <FormInput label="Telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
        <FormInput label="Endereço" value={endereco} onChangeText={setEndereco} multiline />

      </ScrollView>

      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  avatarContainer: {
    marginBottom: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: { 
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  avatarEditButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#555',
    borderRadius: 15,
    padding: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  saveButtonContainer: {
    padding: 24,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  saveButton: {
    backgroundColor: '#3498DB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});