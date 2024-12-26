import React, { useRef } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const data = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);
const cardHeight = 120;
const padding = 10;
const offset = cardHeight + padding;

// Define a list of color gradients as tuples
const colorGradients: [string, string][] = [
    ['#ff7eb3', '#ff758c'],
    ['#ff9a9e', '#fecfef'],
    ['#fad0c4', '#ffd1ff'],
    ['#a18cd1', '#fbc2eb'],
    ['#fad0c4', '#ffd1ff'],
    ['#ffecd2', '#fcb69f'],
    ['#fddb92', '#d1fdff'],
    ['#d299c2', '#fef9d7'],
    ['#fdfcfb', '#e2d1c3'],
    ['#a1c4fd', '#c2e9fb'],
];

export default function AnimatedScroll1() {
    const scrollY = useRef(new Animated.Value(0)).current;

    return (
        <FlatList
            style={styles.container}
            data={data}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                useNativeDriver: false,
            })}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
                const inputRange = [offset * index, offset * index + offset];
                const outputRange1 = [1, 0];
                const outputRange2 = [0, offset / 2];
                const scale = scrollY.interpolate({
                    inputRange,
                    outputRange: outputRange1,
                    extrapolate: 'clamp',
                });
                const translateY = scrollY.interpolate({
                    inputRange,
                    outputRange: outputRange2,
                    extrapolate: 'clamp',
                });
                const opacity = scale;
                return (
                    <Animated.View
                        style={[styles.card, { opacity, transform: [{ translateY }, { scale }] }]}
                    >
                        <LinearGradient
                            colors={colorGradients[index % colorGradients.length]} // Ensure tuple usage
                            style={styles.gradient}
                        >
                            <Text style={styles.cardText}>{item}</Text>
                        </LinearGradient>
                    </Animated.View>
                );
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f4f8',
        paddingVertical: padding / 2,
    },
    card: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: padding / 2,
        height: cardHeight,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    gradient: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '700',
    },
});
