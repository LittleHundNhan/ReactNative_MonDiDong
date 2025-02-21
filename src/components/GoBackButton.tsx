import { View, Text, Pressable} from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'

export interface IGoBack{
    onPress?: () => void;
}
export const GoBack = ({onPress}: IGoBack) => {
  return (
    <View>
      <Ionicons name = "chevron-back-circle" size={30} color = "#fff"/>
    </View>
  )
}

export default GoBack