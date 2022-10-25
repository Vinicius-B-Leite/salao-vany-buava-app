import RNDateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { View } from 'react-native';

export default function HourPicker({hour, setHour, setShowHourPicker}) {
    function onChange(event, selectedDate) {
        const currentDate = selectedDate;
        setShowHourPicker(false)
        setHour(currentDate);
    }
    return <RNDateTimePicker
            value={hour}
            mode='time'
            onChange={onChange}
        />
    
}