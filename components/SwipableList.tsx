import React, { useRef, useState } from 'react';
import {
    Animated,
    PanResponder,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import tickIcon from '../assets/AppAssets/tick.png'; // Ensure this path is correct

export default function SwipableList(): JSX.Element {
    // Limit the data to 10 items
    const [data, setData] = useState<number[]>(Array.from({ length: 10 }, (_, i) => i));

    const handleRemoveItem = (index: number): void => {
        setData((prevData) => prevData.filter((_, i) => i !== index));
    };

    return (
        <ScrollView>
            {data.map((item, index) => (
                <SwipableItem
                    key={item}
                    index={index}
                    onRemove={() => handleRemoveItem(index)}
                />
            ))}
        </ScrollView>
    );
}

type SwipableItemProps = {
    index: number;
    onRemove: () => void;
};

function SwipableItem({ index, onRemove }: SwipableItemProps): JSX.Element {
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const [showTick, setShowTick] = useState(false);

    // Generate dynamic color based on index
    const backgroundColor = `hsl(${(index * 45) % 360}, 70%, 50%)`;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponderCapture: (_, gestureState) => Math.abs(gestureState.dx) > 10,
            onPanResponderMove: Animated.event([null, { dx: pan.x }], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx < -100) {
                    // Swipe Left: Remove item
                    Animated.timing(pan, {
                        toValue: { x: -500, y: 0 },
                        useNativeDriver: true,
                        duration: 300,
                    }).start(() => {
                        onRemove();
                    });
                } else if (gestureState.dx > 100) {
                    // Swipe Right: Show tick
                    setShowTick(true);
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: true,
                    }).start();
                } else {
                    // Reset position
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: true,
                    }).start();
                }
            },
            onPanResponderTerminate: () => {
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                }).start();
            },
        })
    ).current;

    return (
        <Animated.View
            style={[
                styles.item,
                { transform: pan.getTranslateTransform(), backgroundColor },
            ]}
            {...panResponder.panHandlers}
        >
            <View style={styles.contentContainer}>
                {showTick && <Image source={tickIcon} style={styles.tickIcon} />}
                <Text style={styles.txt}>Swipe to left to remove and right to keep</Text>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    item: {
        height: 80,
        width: '100%',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {
        color: '#fff',
        letterSpacing: 1,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tickIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
});
