import React, { useRef } from 'react';
import {
    Animated,
    Button,
    PanResponder,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function PanhandlerContinuous() {
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    const offset = useRef({ x: 0, y: 0 });

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                offset.current = {
                    x: pan.x._value,
                    y: pan.y._value,
                };
                pan.setOffset(offset.current);
                pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset();
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <View style={styles.line1} />
            <View style={styles.line2} />
            <Animated.View
                style={[styles.box1, { transform: [{ translateX: pan.x }] }]}
            />
            <Animated.View
                style={[styles.box2, { transform: [{ translateY: pan.y }] }]}
            />
            <Animated.View
                style={[styles.box, { transform: pan.getTranslateTransform() }]}
                {...panResponder.panHandlers}>
                <Text style={styles.txt}>MOVE</Text>
            </Animated.View>
            <View style={styles.reset}>
                <Button title="reset" onPress={() => pan.setValue({ x: 0, y: 0 })} color="#ff5722" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        opacity: 0.5,
        borderWidth: 1,
        borderColor: '#e89e87',
    },
    box: {
        height: 100,
        width: 100,
        backgroundColor: '#485e6c',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    box1: {
        height: 10,
        width: 10,
        backgroundColor: '#ff5722',
        position: 'absolute',
        borderRadius: 5,
    },
    box2: {
        height: 10,
        width: 10,
        backgroundColor: '#ff5722',
        position: 'absolute',
        borderRadius: 5,
    },
    line1: {
        height: 1,
        width: '100%',
        backgroundColor: '#573129',
        position: 'absolute',
    },
    line2: {
        height: '100%',
        width: 1,
        backgroundColor: '#a59590',
        position: 'absolute',
    },
    txt: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    reset: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});
