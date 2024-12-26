import React, { useRef } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const lockWidth = width * 0.75;
const lockHeight = 60;
const smallgap = 4;
const finalPosition = lockWidth - lockHeight;

export default function SwipeUnlock() {
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const navigation = useNavigation(); // Hook to navigate
    const translateBtn = pan.x.interpolate({
        inputRange: [0, finalPosition],
        outputRange: [0, finalPosition],
        extrapolate: 'clamp',
    });
    const textOpacity = pan.x.interpolate({
        inputRange: [0, lockWidth / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    const translateText = pan.x.interpolate({
        inputRange: [0, lockWidth / 2],
        outputRange: [0, lockWidth / 4],
        extrapolate: 'clamp',
    });

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {},
            onPanResponderMove: Animated.event([null, { dx: pan.x }], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.vx > 2 || gestureState.dx > lockWidth / 2) {
                    navigateToMainMenu();
                } else {
                    reset();
                }
            },
            onPanResponderTerminate: () => reset(),
        })
    ).current;

    const reset = () => {
        Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            bounciness: 0,
        }).start();
    };

    const navigateToMainMenu = () => {
        Animated.spring(pan, {
            toValue: { x: finalPosition, y: 0 },
            useNativeDriver: true,
            bounciness: 0,
        }).start();
        setTimeout(() => {
            navigation.navigate('MainPage'); // Navigate to the MainPage
        }, 300);
    };

    return (
        <View style={styles.container}>
            <View style={styles.lockContainer}>
                <Animated.Text
                    style={[
                        styles.txt,
                        { opacity: textOpacity, transform: [{ translateX: translateText }] },
                    ]}
                >
                    {'Slide to return to Main Menu ->'}
                </Animated.Text>
                <Animated.View
                    style={[styles.bar, { transform: [{ translateX: translateBtn }] }]}
                    {...panResponder.panHandlers}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 100,
    },
    lockContainer: {
        height: lockHeight,
        width: lockWidth,
        borderRadius: lockHeight,
        backgroundColor: '#555',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    txt: {
        color: '#fff',
        letterSpacing: 2,
    },
    bar: {
        position: 'absolute',
        height: lockHeight - smallgap * 2,
        width: lockHeight - smallgap * 2,
        backgroundColor: '#fff',
        borderRadius: lockHeight,
        left: smallgap,
        elevation: 1,
    },
});
