import React, { useState } from 'react';
import {
    LayoutAnimation,
    Platform,
    StyleSheet,
    Text,
    UIManager,
    View,
    TouchableOpacity,
} from 'react-native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const statuses = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7'];
const activeColor = '#1E88E5';
const inactiveColor = '#B0BEC5';

export default function TrackingStatus() {
    const [activeIndex, setActive] = useState(0);

    const updateActiveIndex = (val: number) => {
        LayoutAnimation.easeInEaseOut();
        setActive(val);
    };

    // Convert percentage to a numeric value relative to container width
    const activeLineWidth = (100 / (statuses.length - 1)) * activeIndex;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tracking Progress</Text>
            <Text style={styles.activeStep}>Current Step: {statuses[activeIndex]}</Text>

            <View style={styles.statusContainer}>
                <View style={styles.line}>
                    <View style={[styles.activeLine, { width: `${activeLineWidth}%` }]} />
                </View>
                {statuses.map((_, index) => (
                    <View style={styles.dot} key={index}>
                        <View
                            style={[
                                index <= activeIndex ? styles.activeDot : styles.inactiveDot,
                            ]}
                        />
                    </View>
                ))}
            </View>

            <View style={styles.labels}>
                {statuses.map((status, index) => (
                    <Text
                        key={status}
                        style={[
                            styles.label,
                            index <= activeIndex ? styles.activeLabel : styles.inactiveLabel,
                        ]}
                    >
                        {status}
                    </Text>
                ))}
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity
                    style={[styles.button, activeIndex === 0 && styles.disabledButton]}
                    onPress={() => updateActiveIndex(activeIndex - 1)}
                    disabled={activeIndex === 0}
                >
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        activeIndex === statuses.length - 1 && styles.disabledButton,
                    ]}
                    onPress={() => updateActiveIndex(activeIndex + 1)}
                    disabled={activeIndex === statuses.length - 1}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
        color: '#37474F',
    },
    activeStep: {
        fontSize: 16,
        color: '#78909C',
        marginBottom: 20,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 70,
        marginBottom: 10,
    },
    line: {
        position: 'absolute',
        height: 6,
        width: '100%',
        backgroundColor: inactiveColor,
        borderRadius: 3,
    },
    activeLine: {
        height: 6,
        backgroundColor: activeColor,
        borderRadius: 3,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    dot: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: inactiveColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeDot: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: activeColor,
    },
    inactiveDot: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: inactiveColor,
    },
    labels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 12,
        textAlign: 'center',
        width: '14%',
    },
    activeLabel: {
        color: activeColor,
        fontWeight: '600',
    },
    inactiveLabel: {
        color: '#90A4AE',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    button: {
        flex: 1,
        backgroundColor: activeColor,
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    disabledButton: {
        backgroundColor: inactiveColor,
    },
});
