import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ iconName, onPress, size, color }) => {
  return (
    <TouchableOpacity onPress={onPress} >
      <Ionicons name={iconName} size={size} color={color}/>
    </TouchableOpacity>
  );
};

export default IconButton;
