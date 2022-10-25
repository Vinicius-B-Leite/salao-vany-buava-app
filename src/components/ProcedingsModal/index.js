import React, { useRef, useState } from 'react';
import { FlatList, Modal, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as S from './styles'

export default function ProcedingsModal({ setProccedingsModalVisible, proceddingsModalVisible }) {

    const [proceddings, setProccedings] = useState([{ name: "Luzes" }])
    const [searchInput, setSearchInput] = useState()
    const searchInputRef = useRef()

    function searchIconClick(){
        if (!searchInputRef.current.isFocused()) searchInputRef.current.focus()
    }

    return (
        <TouchableWithoutFeedback onPress={() => setProccedingsModalVisible(false)}>
            <Modal animationType='slide' onRequestClose={() => setProccedingsModalVisible(false)} visible={proceddingsModalVisible || false}>


                <S.Container>
                    <S.Header>
                        <Ionicons name="arrow-back" size={30} color="#fff" />
                        <S.InputContainer>
                            <TouchableOpacity  onPress={() => searchIconClick()}>
                                <Ionicons name="search" size={24} color="#fff" />
                            </TouchableOpacity>
                            <S.Input ref={searchInputRef} value={searchInput} onChangeText={txt => setSearchInput(txt)} />
                        </S.InputContainer>
                    </S.Header >
                    <FlatList data={proceddings} />
                </S.Container>



            </Modal>
        </TouchableWithoutFeedback>
    );
}