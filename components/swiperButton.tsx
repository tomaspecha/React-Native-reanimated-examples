import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function SwiperPagerButton() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const buttons = ['Button 1', 'Button 2', 'Button 3', 'Button 4', 'Button 5'];
    const buttonColors = ['#FF7F50', '#FF4500', '#6A5ACD', '#20B2AA', '#FFD700']; // Distinct colors for each button

    const onClick = (i: number) => {
        scrollViewRef.current?.scrollTo({ x: i * width, animated: true });
    };

    const scrollViewRef = useRef<ScrollView | null>(null);

    return (
        <View style={styles.container}>
            <View style={{ padding: 10 }}>
                <ButtonContainer
                    buttons={buttons}
                    buttonColors={buttonColors}
                    onClick={onClick}
                    scrollX={scrollX}
                />
            </View>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
            >
                {buttons.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.card,
                            { backgroundColor: buttonColors[index] },
                        ]}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

type ButtonContainerProps = {
    buttons: string[];
    buttonColors: string[];
    onClick: (i: number) => void;
    scrollX: Animated.Value;
};

function ButtonContainer({
                             buttons,
                             buttonColors,
                             onClick,
                             scrollX,
                         }: ButtonContainerProps) {
    const [btnContainerWidth, setWidth] = useState<number>(0);
    const btnWidth = btnContainerWidth / buttons.length;

    const translateX = scrollX.interpolate({
        inputRange: [0, width * (buttons.length - 1)],
        outputRange: [0, btnWidth * (buttons.length - 1)],
    });

    return (
        <View
            style={styles.btnContainer}
            onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        >
            {buttons.map((btn, i) => (
                <TouchableOpacity
                    key={i}
                    style={[styles.btn, { backgroundColor: buttonColors[i] }]}
                    onPress={() => onClick(i)}
                >
                    <Text style={styles.btnText}>{btn}</Text>
                </TouchableOpacity>
            ))}
            <Animated.View
                style={[
                    styles.animatedHighlight,
                    { width: btnWidth, transform: [{ translateX }] },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: '#F8F9FA',
    },
    btnContainer: {
        height: 50,
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#E0E0E0',
        position: 'relative',
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    animatedHighlight: {
        height: '100%',
        backgroundColor: '#00000033',
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: 10,
    },
    card: {
        width: width - 20,
        height: 200,
        marginHorizontal: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
});
