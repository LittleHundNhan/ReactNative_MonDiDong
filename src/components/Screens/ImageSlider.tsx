import react, { useState, useRef } from "react";
import { View, Text, SafeAreaView, Dimensions, Animated, StyleSheet, Image } from "react-native"
import { Entypo, AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useInterval } from '../Hooks/UseInterval';
interface ImageProps {
    images: string[]
}
const Max_Width = Dimensions.get("screen").width;
const ImageSlider = ({ images }: ImageProps) => {
    const animation = useRef(new Animated.Value(0));
    const [currentImage, setCurrentImage] = useState(0);
    const handleAnimation = () => {
        let newCurrentImage = currentImage + 1;
        if (newCurrentImage >= images.length) {
            newCurrentImage = currentImage * 0;
        }
        Animated.spring(animation.current, {
            toValue: - (Dimensions.get('screen').width * newCurrentImage),
            useNativeDriver: true,
        }).start();
        setCurrentImage(newCurrentImage);
    }
    useInterval(() => handleAnimation(), 2000)
    return (
        <>
            <View>
                <Animated.View style={[styles.container, { transform: [{ translateX: animation.current }] }]}>
                    {
                        images.map(image => (
                            <Image key={image} source={{ uri: image }} style={styles.image} />
                        ))
                    }
                </Animated.View>
            </View>
        </>
    )
}
export default ImageSlider
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center"
    },
    image: {
        resizeMode: "contain",
        height: 220,
        width: Dimensions.get("screen").width,
        borderWidth: 7,
        borderColor: "white"
    }
})