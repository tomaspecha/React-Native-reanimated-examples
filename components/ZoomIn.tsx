import React, { useRef, useState } from 'react';
import { Animated, Button, StyleSheet, View, Text } from 'react-native';

const boxWidth = 100;

export default function ScaleAnimated() {
    const scale = useRef(new Animated.Value(1)).current;
    const [scaled, setScaled] = useState(false);
    const animate = () => {
        Animated.spring(scale, {
            toValue: scaled ? 1 : 2,
            useNativeDriver: true,
        }).start();
        setScaled(!scaled);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Zoom In Example when pressed Scale In button </Text>
            <Animated.View style={[styles.box, { transform: [{ scale }] }]} />
            <View style={styles.btn}>
                <Button onPress={animate} title={scaled ? 'Scale Out' : 'Scale In'} color="#1a73e8" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a73e8',
        marginBottom: 20,
        textAlign: 'center',
    },
    box: {
        height: boxWidth,
        width: boxWidth,
        backgroundColor: '#348200',
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    btn: {
        marginTop: 30,
        paddingHorizontal: 50,
    },
});
