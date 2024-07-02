import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Remove from '../assets/remove.png'
import Logo from '../assets/Logo.png'
import Search from '../assets/Search.png'
import Shop from '../assets/cart2.png'

const CartScreen = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    };
    loadCart();
  }, []);

  const removeFromCart = async (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };


  const renderItem = () => {
    return(
        <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            {
                cart.map((item, id) => {
                    return(
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20}} key={id}>
                            <View>
                                <Image source={item.image} style={{width: 100, height: 150}}/>
                            </View>
                            <View>
                                <Text>{item.name}</Text>
                                <Text>{item.description}</Text>
                                <Text>${item.amount}</Text>
                                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                    <Image source={Remove} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
  }

  return (
    <>
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30, width: '100vw'}}>
        <Image source={Logo} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginHorizontal: 140}}/>
        <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 10}}>
            <Image source={Search} />
        </View>
      </View>
      <Text style={styles.title}>CHECKOUT</Text>
      <FlatList
        data={cart.slice(0,1)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize: 20, letterSpacing: 5}}>EST. TOTAL: </Text>
            <Text style={{fontSize: 30, color: "red", letterSpacing: 6}}>$240</Text>
        </View>
    </View>
        <TouchableOpacity onPress={() => alert('Checkout successful')} style={{backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 30, flexDirection: "row", padding: 20}}>
            <Image source={Shop} style={{width: 30, height: 30}}/>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff',}}>CHECKOUT</Text>
        </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginVertical: 40
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 6
  },
});

export default CartScreen;