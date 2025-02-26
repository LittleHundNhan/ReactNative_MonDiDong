import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { GoBack } from './GoBackButton'

interface IHeaderParams {
    goToPrevious?: () => void;
    search?: () => void;
    cartLength?: number;
    gotoCartScreen?: () => void;
}
const HeaderComponent = ({ goToPrevious, search, cartLength, gotoCartScreen }: IHeaderParams) => {
    const [searchInput, setSearchInput] = useState("");
    return (
        <View style={{ backgroundColor: "#000", padding: 10, flexDirection: "row", alignItems: "center" }}>
            <GoBack onPress={goToPrevious} />
            <Pressable style={{
                flexDirection: "row", alignItems: "center", marginHorizontal: 7,
                gap: 10, backgroundColor: "white", borderRadius: 10, height: 38, flex: 1
            }}>
                <Pressable style={{ padding: 10 }} onPress={search}>
                    <AntDesign name="search1" size={20} color="blue" />
                </Pressable>
                <TextInput value={searchInput} onChangeText={setSearchInput} placeholder="Search" />
            </Pressable>
            <Pressable onPress={gotoCartScreen}>
                <View>
                    <View style={styles.cartNum}>
                        <Text style={styles.cartNumText}>
                            {cartLength}
                        </Text>
                    </View>

                </View>
                <MaterialIcons name="shopping-cart" size={30} color={"white"} style={{ padding: 5, marginTop: 3 }} />
            </Pressable>
        </View>
    )
}
export default HeaderComponent
const styles = StyleSheet.create({
    cartNum: {
        position: "absolute",
        backgroundColor: "red", // Đổi sang màu đỏ nổi bật hơn
        width: 22,
        height: 22,
        borderRadius: 11, // Giúp hình tròn mượt hơn
        justifyContent: "center",
        alignItems: "center",
        right: -5, // Canh lề để hiển thị tốt hơn trên icon giỏ hàng
        top: -5,
        borderWidth: 2, // Viền giúp tách biệt với nền
        borderColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5, // Tạo hiệu ứng đổ bóng trên Android
    },
    cartNumText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    }
});
