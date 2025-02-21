import { View, Text, Platform } from 'react-native';
import React from 'react';
import { TabsStackScreenProps } from '../Navigation/TabsNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComponent from '../HeaderComponent';

type Props = {}
const CartScreen = ({ navigation }: TabsStackScreenProps<'Cart'>) => {
    return (
     <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 40 : 0, flex: 1, backgroundColor: 'black'}}>
        <HeaderComponent></HeaderComponent>
    </SafeAreaView>
    )
}
export default CartScreen