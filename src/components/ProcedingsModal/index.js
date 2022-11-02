import React, { useEffect, useRef, useState } from 'react';

import { FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import * as S from './styles'
import Item from './Item';

import { Ionicons } from '@expo/vector-icons';

import { child, get, ref } from 'firebase/database';
import { db } from '../../service/firebase';

export default function ProcedingsModal({ setProccedingsModalVisible, proceddingsModalVisible, type, selectedProceedings, setSelectedProceedings, proceedingsKeys }) {

    const [searchInput, setSearchInput] = useState()
    const searchInputRef = useRef(null)
    const [filterProceedings, setFilterProceedings] = useState()
    const [proceedings, setProceedings] = useState([])


    useEffect(() => {

        get(child(ref(db), 'procedimentos/' + type)).then((snapshot) => {
            setProceedings([])
            let data = snapshot.val()

            let keys = Object.keys(data)

            keys.forEach(k => {
                let proceedginsDB = {}
                proceedginsDB['id'] = k
                proceedginsDB['name'] = data[k].nome
                proceedginsDB['selected'] = proceedingsKeys?.includes(k) ? true : false

                proceedingsKeys?.includes(k) && setSelectedProceedings(oldP => [...oldP, proceedginsDB])
                    
                setProceedings(oldProceedings => [...oldProceedings, proceedginsDB])

            })
        })



    }, [type])

    function searchIconClick() {
        if (!searchInputRef.current.isFocused()) searchInputRef.current.focus()
    }

    function filterSearch(txt) {
        setSearchInput(txt)
        let oldPo = [...proceedings]
        let proceedingsFilter = oldPo.filter(item => {
            return item.name.includes(txt.toLowerCase()) === true
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
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Item data={item} setSelectedProceedings={setSelectedProceedings} selectedProceedings={selectedProceedings} type={type} setProceedings={setProceedings}/>}
                    />

                </S.Container>


            </Modal>
        </TouchableWithoutFeedback>
    );
}