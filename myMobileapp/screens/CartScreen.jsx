    import React, { useState, useEffect } from 'react';
    import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { Ionicons } from '@expo/vector-icons';
    export default function CartScreen() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const loadCart = async () => {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
        };
        loadCart();
    }, []);

    const removeFromCart = async (productId) => {
        const newCart = cart.filter((item) => item.id !== productId);
        setCart(newCart);
        await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    };

    return (
        <View style={styles.container}>
        <Text style={styles.header}>Cart</Text>
        <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={styles.product}>
                <Text>{item.name} - ${item.price}</Text>
                <Button title="Remove" onPress={() => removeFromCart(item.id)} />
            </View>
            )}
        />
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        marginBottom: 16,
    },
    product: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    });
