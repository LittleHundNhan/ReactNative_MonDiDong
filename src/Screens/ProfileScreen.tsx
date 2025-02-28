import { View, Text } from 'react-native';
import React from 'react';
import { TabsStackScreenProps } from '../components/Navigation/TabsNavigation';

type Props = {}
const ProfileScreen = ({ navigation }: TabsStackScreenProps<'Profile'>) => {
    return (
        <View style={{ marginTop: 50 }}>
            <Text>Profile Screen</Text>
        </View>
    )
}
export default ProfileScreen