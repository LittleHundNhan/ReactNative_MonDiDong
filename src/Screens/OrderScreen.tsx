import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";

interface AddressSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

const OrderScreen = ({ navigation }: TabsStackScreenProps<"Order">) => {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [location, setLocation] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
  });

  const fetchAddressSuggestions = async (text: string) => {
    setAddress(text);
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}&addressdetails=1&limit=5`;

    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "OrderApp" },
      });
      const data: AddressSuggestion[] = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Lỗi lấy gợi ý địa chỉ:", error);
    }
  };

  const handleSelectAddress = (item: AddressSuggestion) => {
    setAddress(item.display_name);
    setSuggestions([]);
    setLocation({
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
    });
  };

  const handleConfirmAddress = () => {
    if (!address) {
      Alert.alert("Lỗi", "Vui lòng nhập địa chỉ trước khi tiếp tục.");
      return;
    }
    navigation.navigate("Payment", { address }); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập Địa Chỉ Giao Hàng</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ..."
          value={address}
          onChangeText={fetchAddressSuggestions}
        />
      </View>

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id.toString()}
          style={styles.suggestionsList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleSelectAddress(item)}
            >
              <Text style={styles.suggestionText}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={location} title="Địa chỉ của bạn" />
      </MapView>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmAddress}>
        <Text style={styles.confirmButtonText}>Xác Nhận Địa Chỉ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    height: 50,
    fontSize: 16,
    borderRadius: 8,
  },
  suggestionsList: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    maxHeight: 200,
    marginTop: 5,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionText: {
    fontSize: 16,
    color: "#333",
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 15,
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrderScreen;
