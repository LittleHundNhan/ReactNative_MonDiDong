import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { GoBack } from './GoBackButton';

interface IHeaderParams {
    pageTitle?: string;
    goToPrevious?: () => void;
    search?: (query: string) => void;
    cartLength?: number;
    gotoCartScreen?: () => void;
}

const HeaderComponent = ({ goToPrevious, search, cartLength, gotoCartScreen }: IHeaderParams) => {
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (text: string) => {
        setSearchInput(text);
        if (search) {
            search(text);
        }
    };
    

    return (
        <View style={styles.headerContainer}>
            <GoBack onPress={goToPrevious} />
            <Pressable style={styles.searchContainer}>
                <AntDesign name="search1" size={20} color="blue" style={{ padding: 10 }} />
                <TextInput 
                    value={searchInput}
                    onChangeText={handleSearch}
                    placeholder="Search"
                    style={{ flex: 1 }}
                />
            </Pressable>
            <Pressable onPress={gotoCartScreen}>
                <View>
                    {cartLength && cartLength > 0 ? (
                        <View style={styles.cartNum}>
                            <Text style={styles.cartNumText}>{cartLength}</Text>
                        </View>
                    ) : null}
                </View>
                <MaterialIcons name="shopping-cart" size={30} color="white" style={styles.cartIcon} />
            </Pressable>
        </View>
    );
};

export default HeaderComponent;

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#000",
        padding: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 7,
        gap: 10,
        backgroundColor: "white",
        borderRadius: 10,
        height: 38,
        flex: 1
    },
    cartNum: {
        position: "absolute",
        backgroundColor: "red",
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: "center",
        alignItems: "center",
        right: -5,
        top: -5,
        borderWidth: 2,
        borderColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    cartNumText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    cartIcon: {
        padding: 5,
        marginTop: 3,
    },
});