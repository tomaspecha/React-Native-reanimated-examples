import React, { useState } from 'react';
import {
    LayoutAnimation,
    Platform,
    ScrollView,
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

export default function CollapsibleHeader1() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x, i) => (
                <Item key={x} i={i} />
            ))}
        </ScrollView>
    );
}

type ItemProps = {
    i: number; // Explicitly declare the type of 'i'
};

function Item({ i }: ItemProps) {
    const [open, setopen] = useState(false);
    const onPress = () => {
        LayoutAnimation.easeInEaseOut();
        setopen(!open);
    };
    return (
        <TouchableOpacity style={[styles.item, open && styles.itemOpen]} onPress={onPress} activeOpacity={0.9}>
            <View style={styles.row}>
                <Text style={styles.headerText}>Header - {i + 1}</Text>
                <Text style={styles.actionText}>{open ? 'Close' : 'Open'}</Text>
            </View>
            {open &&
                [1, 2, 3, 4, 5].map((x) => (
                    <Text key={x} style={styles.subItem}>
                        - Item {x}
                    </Text>
                ))}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f4f4f4', // Light background for modern look
    },
    item: {
        backgroundColor: '#ffffff', // White card-style background
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    itemOpen: {
        backgroundColor: '#f0f8ff', // Slightly different color for open state
        borderWidth: 1,
        borderColor: '#1e90ff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    actionText: {
        fontSize: 16,
        color: '#1e90ff', // Blue color for the action
        fontWeight: '500',
    },
    subItem: {
        paddingVertical: 5,
        fontSize: 14,
        color: '#555', // Subtle color for sub-items
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
});
