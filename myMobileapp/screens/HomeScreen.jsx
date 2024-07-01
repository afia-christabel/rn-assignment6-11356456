    import React, { useState, useEffect } from 'react';
    import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';
    import AsyncStorage from '@react-native-async-storage/async-storage';

    const products = [
    { id: '1', name: 'Office Wear', description: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress4.png') },
    { id: '2', name: 'Black',  description: 'Reversible Angora Cardigan', price: 170, image: require('../assets/dress1.png') },
    { id: '3', name: 'Church Wear',  description: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress2.png') },
    { id: '4', name: 'Lamerei',  description: 'Reversible Angora Cardigan ', price: 120, image: require('../assets/dress4.png') },
    { id: '5', name: '21WN',  description: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress2.png') },
    { id: '6', name: 'Lopo',  description: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress6.png') },
    { id: '7', name: '21VN',  description: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress1.png') },
    { id: '8', name: 'Lame ',  description: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress3.png') }
    ];

    export default function HomeScreen({ navigation }) {
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

    const addToCart = async (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    };

    const renderProductItem = ({ item, index }) => {
        if (index >= products.length) {
            return null;
        }
        if (index % 2 === 0) {
        return (
            <View style={styles.row}>
            <View style={[styles.productCard, styles.leftProductCard]}>
                <Image source={item.image} style={[styles.productImage, styles.leftProductImage]} />
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productDescription}>{item.description}</Text>
                    <Text style={styles.productPrice}> ${item.price}</Text>
                    <TouchableOpacity onPress={() => addToCart(item)}>
                        <Image source={require('../assets/add_circle.png')} style={styles.addToCart} />
            </TouchableOpacity>
            </View>
            {products[index + 1] && (
                <View style={[styles.productCard]}>
                    <Image source={products[index + 1].image} style={styles.productImage} />
                    <Text  style={styles.productName}>{products[index + 1].name}</Text>
                    <Text style={styles.productDescription}>{item.description}</Text>
                    <Text style={styles.productPrice}> ${products[index + 1].price}</Text>
                    <TouchableOpacity onPress={() => addToCart(products[index + 1])}>
                        <Image source={require('../assets/add_circle.png')} style={[styles.addToCart, styles.rightAddToCart]} />
                    </TouchableOpacity>
                </View>
            )}
            </View>
        );
        }
        return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>
            <Image style={styles.menuIcon} source={require('../assets/Menu.png')} />
            <Image style={styles.logoText} source={require('../assets/Logo.png')} />
            <Image style={styles.searchIcon} source={require('../assets/Search.png')} />
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Image style={styles.shoppingBagIcon} source={require('../assets/shoppingBag.png')} />
            </TouchableOpacity>
            </View>
            <View style={styles.sectionTwo}>
            <Text style={styles.sectionTwoText}>O U R  S T O R Y</Text>
            <View style={styles.listContainer}>
                <Ionicons style={styles.listIcon} name="list" size={25} color="black" />
            </View>
            <View style={styles.filterContainer}>
                <Ionicons style={styles.filterIcon} name="filter" size={20} color="#FA908A" />
            </View>
            </View>
            <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={renderProductItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    navBar: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 27,
        paddingLeft: 5,
        paddingRight: 10,
    },
    menuIcon: {
        width: 20,
        height: 25,
        position: 'relative',
        alignItems: 'center',
        left: 10,
    },

    logoText: {
        width: 100,
        height: 40,
    },

    searchIcon: {
        position: 'absolute',
        right: 43,

    },

    shoppingBagIcon: {
        width: 24,
        height: 24,
        position: 'relative',
        right: -1,
    },

    sectionTwo: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        margin: 16,
    },

    sectionTwoText: {
        fontSize: 30,
        fontWeight: 650,
        marginBottom: 10,
        position: 'relative',
        color: 'black',
    },

    listContainer: {
        height: 40,
        width: 40,
        backgroundColor: '#F7F7F7',
        borderRadius: 100,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 16,
        left: 80,
        bottom: 5,

    },
    filterContainer: {
        height: 40,
        width: 40,
        backgroundColor: '#F7F7F7',
        borderRadius: 100,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 16,
        left: 30,
        bottom: 5,
    },
    listIcon: {
        position: 'relative',
        left: 8,
    },
    filterIcon: {
        position: 'relative',
        left: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    productCard: {
        flexDirection: 'column',
        height: 370,
        flex: 1,
        margin: 8,
        alignItems: 'left',
        justifyContent: 'flex-start',
    },
    productImage: {
        width: '100%',
        height: 300,
        marginBottom: 8,
        marginTop:6,
    },
    productName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 14,
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 4,
        color: '#F56262',
        right: 5,
    },
    addToCart: {
        width: 24,
        height: 24,
        bottom: 120,
        left: 170,
        position: 'relative',
    },
    rightAddToCart: {
        width: 24,
        height: 24,
        position: 'relative',
        left: 165,
        
    },
    });
