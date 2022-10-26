import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Modal, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as S from './styles'
import Item from './Item';

export default function ProcedingsModal({ setProccedingsModalVisible, proceddingsModalVisible, data }) {

    const [searchInput, setSearchInput] = useState()
    const searchInputRef = useRef()
    const [proceedins, setProceedings] = useState()

    useEffect(() => {

        function formatDataStructure() {
            setProceedings(Object.keys(data).map(item => {
                let newItem = {}
                newItem[item] = data[item]
                return newItem
            }))
        }

        formatDataStructure()

    }, [])

    function searchIconClick() {
        if (!searchInputRef.current.isFocused()) searchInputRef.current.focus()
    }

    function filterSearch(txt) {
        setSearchInput(txt)
    }

    return (
        <TouchableWithoutFeedback onPress={() => setProccedingsModalVisible(false)}>
            <Modal animationType='slide' onRequestClose={() => setProccedingsModalVisible(false)} visible={proceddingsModalVisible || false}>


                <S.Container>

                    <S.Header>

                        <TouchableOpacity onPress={() => setProccedingsModalVisible(false)}>
                            <Ionicons name="arrow-back" size={30} color="#fff" />
                        </TouchableOpacity>

                        <S.InputContainer>

                            <TouchableOpacity onPress={() => searchIconClick()}>
                                <Ionicons name="search" size={24} color="#fff" />
                            </TouchableOpacity>

                            <S.Input
                                ref={searchInputRef}
                                value={searchInput}
                                onChangeText={txt => filterSearch(txt)} />
                        </S.InputContainer>

                    </S.Header >

                </S.Container>


            </Modal>
        </TouchableWithoutFeedback>
    );
}