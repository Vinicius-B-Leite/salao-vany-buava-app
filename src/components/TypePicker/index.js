import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function TypePicker({ selectedType, setSelectedType }) {
    return (
        <Picker
            style={{ color: '#fff', width: '40%' }}
            dropdownIconColor={'#fff'}
            dropdownIconRippleColor={'#fff'}
            selectedValue={selectedType}
            onValueChange={(itemValue, itemIndex) =>
                setSelectedType(itemValue)
            }>
            <Picker.Item label="Cabelo" value="cabelo" />
            <Picker.Item label="Unha" value="unha" />
            <Picker.Item label="Cílios" value="cilios" />
        </Picker>
    );
}