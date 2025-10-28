import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { CaretRight } from 'phosphor-react-native';

type ProfileMenuItemProps = {
  icon: React.ReactNode; 
  label: string;
  onPress: () => void;
};

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.iconContainer}>
        {icon} 
      </View>
      
      <Text style={styles.label}>{label}</Text>

      <CaretRight color="#CCC" size={16} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EEE',
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileMenuItem;