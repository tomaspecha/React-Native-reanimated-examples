import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Props for defining sentences, typing delay, speed, and optional style
type AnimatedTypewriterTextProps = {
    sentences: string[]; // Sentences to display
    delay: number; // Delay before the next sentence
    speed: number; // Typing speed
    style?: object; // Optional container style
};

const AnimatedTypewriterText: React.FC<AnimatedTypewriterTextProps> = ({
                                                                           sentences,
                                                                           delay,
                                                                           speed,
                                                                           style,
                                                                       }) => {
    const [animatedText, setAnimatedText] = useState(''); // Current text being typed
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0); // Current sentence index
    const [showCursor, setShowCursor] = useState(true); // Cursor visibility

    // Starts typing when the sentence index changes
    useEffect(() => {
        if (currentSentenceIndex < sentences.length) {
            startTypingAnimation(sentences[currentSentenceIndex]);
        }
    }, [currentSentenceIndex]);

    // Toggles the blinking cursor
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prevState) => !prevState);
        }, 500);
        return () => clearInterval(cursorInterval); // Clear interval on unmount
    }, []);

    // Handles the typing effect for each sentence
    const startTypingAnimation = (sentence: string) => {
        let index = 0;
        setAnimatedText(''); // Clear previous text

        const typingInterval = setInterval(() => {
            setAnimatedText((prevText) => prevText + sentence[index]); // Add one character
            index++;

            if (index >= sentence.length) { // If the sentence is fully typed
                clearInterval(typingInterval); // Stop typing
                setTimeout(() => {
                    // Move to the next sentence or restart
                    setCurrentSentenceIndex((prevIndex) =>
                        prevIndex + 1 < sentences.length ? prevIndex + 1 : 0
                    );
                }, delay);
            }
        }, speed);
    };

    return (
        <View style={style}>
            <Text style={styles.text}>
                {animatedText}
                {showCursor && <Text style={styles.cursor}>|</Text>} {/* Show cursor */}
            </Text>
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
                    ' Crafting intuitive and dynamic user experiences.',
                    ' Let me show you something amazing!',
                    ' Stay inspired and keep learning!',
                    ' Hopefully these examples help you create something cool.',
                ]}
                delay={1000} // Delay before next sentence
                speed={60} // Typing speed
                style={styles.textContainer}
            />
        </View>
    );
};

// Component styles
const styles = StyleSheet.create({
    container: {
        flex: 1, // Full-screen layout
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        backgroundColor: '#1e1e2f', // Dark background
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 20, // Top margin
        paddingHorizontal: 20, // Horizontal padding
    },
    text: {
        fontSize: 20, // Font size
        color: '#e0e0e0', // Light color for readability
        textAlign: 'center', // Center align text
        fontFamily: 'Helvetica', // Clean font style
    },
    cursor: {
        fontSize: 20, // Cursor font size
        color: '#e0e0e0', // Cursor color
        opacity: 0.7, // Slightly transparent cursor
    },
});

export default AnimatedTyping;g;
