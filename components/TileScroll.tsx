import React from 'react';
import { TouchableOpacity, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
    withSpring,
    interpolateColor,
    useAnimatedRef,
    scrollTo,
    runOnUI,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const cardWidth = width - 120;

export default function TileScrolling2Reanimated() {
    const data = Array(5).fill(0).map(() => getRandomColor());
    const translationX = useSharedValue(0);
    const activeIndex = useSharedValue(0);
    const animatedRef = useAnimatedRef();

    const scrollHandler = useAnimatedScrollHandler(event => {
        const scrollPosition = (translationX.value + cardWidth / 2) / cardWidth;
        activeIndex.value = Math.floor(scrollPosition);
        translationX.value = event.contentOffset.x;
    });

    const animatedBg = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            translationX.value,
            data.map((_, i) => i * cardWidth),
            data.map(color => `${color}88`),
        ),
    }));

    const onPress = (i) => {
        runOnUI(scrollTo)(animatedRef, i * cardWidth, 0, true);
    };

    return (
        <SafeAreaView style={styles.flex}>
            <Animated.View style={[animatedBg, styles.background]} />
            <Text style={styles.title}>Interactive Tile Scrolling by Tomas Pecha</Text>
            <Animated.ScrollView
                ref={animatedRef}
                horizontal
                pagingEnabled
                decelerationRate="fast"
                contentContainerStyle={styles.scrollContainer}
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                snapToInterval={cardWidth}>
                {data.map((item, index) => (
                    <Card key={`card-${index}`} {...{ item, index, translationX, activeIndex, onPress }} />
                ))}
            </Animated.ScrollView>
        </SafeAreaView>
    );
}

function Card({ item, index, translationX, activeIndex, onPress }) {
    const animatedCardStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withSpring(
                    interpolate(activeIndex.value, [index - 1, index, index + 1], [0.9, 1, 0.9]),
                ),
            },
            {
                translateY: interpolate(activeIndex.value, [index - 1, index, index + 1], [30, 0, 30]),
            },
        ],
        backgroundColor: item,
    }));

    return (
        <Animated.View style={[styles.card, animatedCardStyle]}>
            <TouchableOpacity style={styles.touchable} onPress={() => onPress(index)}>
                <Text style={styles.cardText}>{`Tile ${index + 1}`}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
    },
    scrollContainer: {
        paddingHorizontal: (width - cardWidth) / 2,
        alignItems: 'center',
    },
    card: {
        height: 280,
        width: cardWidth,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    },
    touchable: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}
