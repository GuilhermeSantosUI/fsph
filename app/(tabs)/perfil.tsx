import React from 'react';
import { GearSix, HandPalm, Question, UserSound, Gavel, DoorOpen } from "phosphor-react-native";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import ProfileMenuItem from '../../components/ProfileMenuItem';
import { router } from 'expo-router';

const settingsIcon = require('../../assets/icons/settings.png');
const privacyIcon = require('../../assets/icons/privacy.png');
const helpIcon = require('../../assets/icons/help.png');
const shareIcon = require('../../assets/icons/share.png');
const legalIcon = require('../../assets/icons/legal.png');
const logoutIcon = require('../../assets/icons/logout.png');

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.profileAvatarContainer}>
            <View style={styles.profileAvatar}>
              <Text style={styles.avatarText}>G</Text>
            </View>
            <View style={styles.diamondIcon}>
              <Text style={styles.diamondText}>✦</Text>
            </View>
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>Guilherme</Text>
            <Text style={styles.profileSubtitle}>Cidadão</Text>
          </View>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsValue}>54</Text>
            <Text style={styles.pointsLabel}>Pontos</Text>
          </View>
        </View>

        <View style={styles.menuList}>
            <ProfileMenuItem
            icon={<GearSix size={24} color="#555" />}
            label="Configurações da conta"
            onPress={() => router.push('/configuracoes')}
            />
        <ProfileMenuItem
          icon={<HandPalm size={24} color="#555" />}
          label="Privacidade"
          onPress={() => console.log('Clicou em Privacidade')}
        />

        <ProfileMenuItem
            icon={<Question size={24} color="#555" />}
            label="Receber ajuda"
            onPress={() => console.log('Clicou em Ajuda')}
          />
          <ProfileMenuItem
            icon={<UserSound size={24} color="#555" />}
            label="Indicar para um amigo"
            onPress={() => console.log('Clicou em Indicar')}
          />
          <ProfileMenuItem
            icon={<Gavel size={24} color="#555" />}
            label="Jurídico"
            onPress={() => console.log('Clicou em Jurídico')}
          />
          <ProfileMenuItem
            icon={<DoorOpen size={24} color="#555" />}
            label="Sair da conta"
            onPress={() => console.log('Clicou em Sair')}
          />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  profileAvatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  diamondIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#F560D8',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 2,
  },
  diamondText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  pointsContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#888',
  },
  menuList: {
    marginTop: 20,
  },
});