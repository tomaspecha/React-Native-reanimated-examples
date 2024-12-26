import React, { useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AnimatedTextInput() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.sectionText}>Enter your personal information:</Text>
            <AnimatedInput value={name} onChange={setName} placeholder="Name" multiline={false} />
            <Text style={styles.sectionText}>Provide a valid email address:</Text>
            <AnimatedInput value={email} onChange={setEmail} placeholder="Email" multiline={false} />
            <Text style={styles.sectionText}>Add your current address:</Text>
            <AnimatedInput
                value={address}
                onChange={setAddress}
                placeholder="Address"
                multiline={true}
            />
        </ScrollView>
    );
}

type AnimatedInputProps = {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
    multiline: boolean;
};

function AnimatedInput({
                           value,
                           onChange,
                           placeholder,
                           multiline,
                       }: AnimatedInputProps) {
    const [inputHeight, setHeight] = useState<number | null>(null);
    const [placeholderWidth, setWidth] = useState<number | null>(null);
    const animation = useRef(new Animated.Value(0)).current;

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -(inputHeight || 0) / (multiline ? 2.5 : 2)],
    });

    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Math.max(-(placeholderWidth || 0) / 4, -10)],
    });

    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.9],
    });

    const onFocus = () => animate(1);
    const onBlur = () => !value && animate(0);

    const animate = (val: number) => {
        Animated.spring(animation, {
            toValue: val,
            bounciness: 0,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View
            style={styles.inputContainer}
            onLayout={(e) => !inputHeight && setHeight(e.nativeEvent.layout.height)}
        >
            <View style={styles.placeholderContainer}>
                <Animated.Text
                    style={[
                        styles.placeholder,
                        {
                            transform: [{ translateY }, { translateX }, { scale }],
                        },
                    ]}
                    onTextLayout={(e) =>
                        !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
                    }
                >
                    {placeholder}
                </Animated.Text>
            </View>
            <TextInput
                style={[styles.input, multiline && { height: 100, textAlignVertical: 'top' }]}
                onFocus={onFocus}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline={multiline}
                placeholderTextColor="#b0b0b0"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f7f8fa',
        alignItems: 'center',
    },
    inputContainer: {
        width: '90%',
        maxWidth: 400,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#e0e0e0',
        marginBottom: 20,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    input: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    placeholderContainer: {
        position: 'absolute',
        top: -10,
        left: 15,
        backgroundColor: '#ffffff',
        paddingHorizontal: 5,
        borderRadius: 5,
        zIndex: 1,
    },
    placeholder: {
        fontSize: 14,
        color: '#888',
    },
    sectionText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
        textAlign: 'left',
        width: '90%',
        maxWidth: 400,
        fontWeight: '600',
    },
});
