import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Modal, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as S from './styles'
import Item from './Item';
import { child, get, ref } from 'firebase/database';
import { db } from '../../service/firebase';

export default function ProcedingsModal({ setProccedingsModalVisible, proceddingsModalVisible, type }) {

    const [searchInput, setSearchInput] = useState()
    const searchInputRef = useRef(null)
    const [proceedings, setProceedings] = useState()
    const [filterProceedings, setFilterProceedings] = useState()

    useEffect(() => {

        function addSelectedStatus(data){
            Object.keys(data).map(item => {
                 return data[item]['selected'] = false
            })
            return data
        }

        function convertoToArray(data){
            let array = Object.keys(data).map(item => {
                let newItem = {}
                newItem[item] = data[item]
                return newItem
            })

            setProceedings(array)
        }
        

        get(child(ref(db), 'procedimentos/' + type)).then((snapshot) => {
            let newObj = addSelectedStatus(snapshot.val())
            convertoToArray(newObj)
        })
        

    }, [])

    function searchIconClick() {
        if (!searchInputRef.current.isFocused()) searchInputRef.current.focus()
    }

    function filterSearch(txt) {
        setSearchInput(txt)
        let proceedingsFilter = proceedings.filter(item => {
            return item && Object.values(item)[0].nome.includes(txt.toLowerCase())
        })
        setFilterProceedings(proceedingsFilter)
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

                    <FlatList
                        style={{ marginTop: '15%' }}
                        data={searchInput ? filterProceedings : proceedings}
                        keyExtractor={(item) => Object.keys(item).toString()}
                        renderItem={({ item }) => <Item data={item} />}
                    />
                    
                </S.Container>


            </Modal>
        </TouchableWithoutFeedback>
    );
}