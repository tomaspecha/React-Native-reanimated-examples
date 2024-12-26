import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type AnimatedTypewriterTextProps = {
    sentences: string[];
    delay: number;
    speed: number;
    style?: object;
};

const AnimatedTypewriterText: React.FC<AnimatedTypewriterTextProps> = ({ sentences, delay, speed, style }) => {
    const [animatedText, setAnimatedText] = useState('');
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        if (currentSentenceIndex < sentences.length) {
            startTypingAnimation();
        } else {
            setCurrentSentenceIndex(0);
        }
    }, [currentSentenceIndex]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prevState) => !prevState);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    const startTypingAnimation = () => {
        const currentSentence = sentences[currentSentenceIndex];
        let index = 0;

        const typingInterval = setInterval(() => {
            setAnimatedText((prevState) => prevState + currentSentence[index]);
            index++;

            if (index === currentSentence.length) {
                clearInterval(typingInterval);
                setTimeout(() => {
                    setCurrentSentenceIndex((prevState) => prevState + 1);
                    setAnimatedText('');
                }, delay);
            }
        }, speed);
    };

    return (
        <View style={style}>
            <Text style={styles.text}>{animatedText}</Text>
            {showCursor && <Text style={styles.cursor}>|</Text>}
        </View>
    );
};

const AnimatedTyping: React.FC = () => {
    return (
        <View style={styles.container}>
            <AnimatedTypewriterText
                sentences={[
                    'Hi, I am Tomas Pecha.',
                    'I am a passionate software developer.',
                    'Crafting intuitive and dynamic user experiences.',
                    'Let\'s create something amazing together!',
                    'Stay inspired and keep learning!'
                ]}
                delay={1000}
                speed={60}
                style={styles.textContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1e2f', // Modern dark background
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 20,
        color: '#e0e0e0', // Light text for better readability
        textAlign: 'center',
        fontFamily: 'Helvetica', // Clean and modern font
    },
    cursor: {
        fontSize: 20,
        color: '#e0e0e0',
        opacity: 0.7,
        position: 'absolute',
        right: -5,
    },
});

export default AnimatedTyping;
