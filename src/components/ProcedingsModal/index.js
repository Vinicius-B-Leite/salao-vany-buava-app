import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ActivityIndicator, FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import * as S from './styles'
import Item from './Item';

import { Ionicons } from '@expo/vector-icons';

import { child, get, ref } from 'firebase/database';
import { db } from '../../service/firebase';
import { useFocusEffect } from '@react-navigation/native';

export default function ProcedingsModal({ setProccedingsModalVisible, proceddingsModalVisible, type, selectedProceedings, setSelectedProceedings, proceedingsKeys }) {

    const [searchInput, setSearchInput] = useState()
    const searchInputRef = useRef(null)
    const [filterProceedings, setFilterProceedings] = useState()
    const [proceedings, setProceedings] = useState([])
    const [loading, setLoading] = useState(true)

    function getProceedings() {
        get(child(ref(db), 'procedimentos/' + type)).then((snapshot) => {
            if(!snapshot.exists) return
            setProceedings([])
            let data = snapshot.val()

            let keys = Object.keys(data)

            keys.forEach(k => {
                let proceedginsDB = {}
                proceedginsDB['id'] = k
                proceedginsDB['name'] = data[k].nome
                proceedginsDB['selected'] = selectedProceedings.map(item => item.id).includes(k) ? true : false
                
                //if the update procedings screen call the modal
                if (proceedingsKeys?.includes(proceedginsDB.id)){
                    proceedginsDB['selected'] = true
                    setSelectedProceedings(oldP => [...oldP, proceedginsDB])
                }
                if(selectedProceedings.map(item => item.id).includes(proceedginsDB.id)) {
                    setSelectedProceedings(oldP => [...oldP, proceedginsDB])
                }
                

                setProceedings(oldProceedings => [...oldProceedings, proceedginsDB])

            })
        }).finally(() => setLoading(false))
    }

    useEffect(() => {
        setSelectedProceedings([])
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
        <Modal 
            animationType='slide' 
            onRequestClose={() => setProccedingsModalVisible(false)} 
            visible={proceddingsModalVisible || false}
            onShow={getProceedings}>
            
            {
                loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0C031E' }}>
                        <ActivityIndicator size={50} color='#54407C' />
                    </View>
                    :
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
                            renderItem={({ item }) => <Item data={item} setSelectedProceedings={setSelectedProceedings} selectedProceedings={selectedProceedings} type={type} setProceedings={setProceedings} />}
                        />

                    </S.Container>
            }



        </Modal>
    );
}