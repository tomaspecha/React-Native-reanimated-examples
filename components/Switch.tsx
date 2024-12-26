import React, { useState } from 'react';
import {
    LayoutAnimation,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
const activeColor = 'blue';
const inActiveColor = 'red';
export default function ToggleButton() {
    const [toggleActive, setToggle] = useState(false);
    return (
        <View style={styles.constainer}>
            <Text style={styles.status}>{toggleActive ? 'ON' : 'OFF'}</Text>
            <TouchableOpacity
                style={[
                    styles.toggleContainer,
                    { borderColor: toggleActive ? activeColor : inActiveColor },
                ]}
                onPress={() => {
                    LayoutAnimation.easeInEaseOut();
                    setToggle(!toggleActive);
                }}
                activeOpacity={1}>
                <View
                    style={[
                        styles.toggleBtn,
                        toggleActive
                            ? { backgroundColor: activeColor, alignSelf: 'flex-end' }
                            : { backgroundColor: inActiveColor },
                    ]}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    constainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    status: {
        width: 100,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    toggleContainer: {
        height: 40,
        width: 80,
        borderRadius: 5,
        borderWidth: 0.5,
        overflow: 'hidden',
    },
    toggleBtn: { height: '100%', width: '50%' },
});
