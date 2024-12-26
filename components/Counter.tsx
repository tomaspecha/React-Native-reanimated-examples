import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AnimatedButton() {
    const [count, setCount] = useState(0);
    const animation = useRef(new Animated.Value(0)).current;
    const scale = animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0.95] });

    const onPressIn = () => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        setTimeout(() => {
            Animated.spring(animation, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }, 200);
    };

    const onPress = () => setCount(count + 1);

    return (
        <View style={styles.container}>
            <Text style={styles.countLabel}>Current Count</Text>
            <Text style={styles.count}>{count}</Text>
            <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={1}
                    onPressIn={onPressIn}
                    onPress={onPress}
                    onPressOut={onPressOut}
                >
                    <Text style={styles.btnText}>+1</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3f2fd', // Light blue background
        padding: 20,
    },
    countLabel: {
        fontSize: 18,
        color: '#4a4a4a', // Dark gray
        marginBottom: 10,
    },
    count: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#543931', // Orange accent
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#4caf50', // Green button
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 40,
    },
    btnText: {
        color: '#d00b0b', // White text
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: 1,
    },
});
