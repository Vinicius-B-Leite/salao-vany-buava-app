import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ date, setDate , setShowDatePicker}) {
    function onChange(event, selectedDate) {
        const currentDate = selectedDate;
        setShowDatePicker(false)
        setDate(currentDate);
    }
    return (
        <DateTimePicker
            value={date}
            mode={'date'}
            onChange={onChange}
        />
    );
}