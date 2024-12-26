import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const itemWidth = (width / 5) * 4;
const itemHeight = (height / 3) * 2;
const padding = (width - itemWidth) / 2;
const offset = itemWidth;

const data = [
    { color: 'violet', text: 'Example 1', borderColor: '#a4634b', backgroundColor: '#f5e1f7' },
    { color: 'indigo', text: 'Example 2', borderColor: '#784949', backgroundColor: '#e6e1f7' },
    { color: 'blue', text: 'Example 3', borderColor: '#040435', backgroundColor: '#d9eaf7' },
    { color: 'orange', text: 'Example 4', borderColor: '#FFA500', backgroundColor: '#fde2c6' },
];

type ActiveIndex = {
    current: number;
    previous: number | null;
};

export default function Swiper5() {
    const [activeIndex, setActiveIndex] = useState<ActiveIndex>({ current: 0, previous: null });
    const scale = useRef(new Animated.Value(0)).current;
    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animate();
    }, []);

    useEffect(() => {
        animate();
    }, [activeIndex]);

    const animate = () => {
        scale.setValue(0);
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 1,
            bounciness: 1000,
        }).start();
    };

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const x = e.nativeEvent.contentOffset.x;
        const newIndex = Math.floor(x / itemWidth + 0.5);
        if (activeIndex.current !== newIndex) {
            setActiveIndex({ current: newIndex, previous: activeIndex.current });
        }
    };

    return (
        <View style={styles.container}>
            {data.map((x, i) => (
                <Animated.View
                    key={x.color}
                    style={[
                        styles.bgColor,
                        {
                            zIndex:
                                i === activeIndex.current
                                    ? 0
                                    : i === activeIndex.previous
                                        ? -1
                                        : -2,
                            backgroundColor: x.color,
                            transform: [{ scale: i === activeIndex.current ? scale : 1 }],
                        },
                    ]}
                />
            ))}
            <View style={styles.container} />
            <ScrollView
                horizontal
                pagingEnabled
                decelerationRate="fast"
                style={{ flexGrow: 0 }}
                contentContainerStyle={styles.scrollView}
                showsHorizontalScrollIndicator={false}
                snapToInterval={offset}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: false,
                        listener: onScroll,
                    }
                )}
            >
                {data.map((x, i) => (
                    <Item key={x.color} data={x} i={i} scrollX={scrollX} />
                ))}
            </ScrollView>
            <View style={styles.indicatorContainer}>
                {data.map((x, i) => (
                    <View
                        key={x.color}
                        style={[
                            styles.indicator,
                            i === activeIndex.current && { backgroundColor: '#fff' },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

type ItemProps = {
    i: number;
    data: { color: string; text: string; borderColor: string; backgroundColor: string };
    scrollX: Animated.Value;
};

function Item({ i, data, scrollX }: ItemProps) {
    const scale = scrollX.interpolate({
        inputRange: [-offset + i * offset, i * offset, offset + i * offset],
        outputRange: [0.9, 1, 0.9],
    });

    return (
        <Animated.View
            style={[
                styles.item,
                {
                    transform: [{ scale }],
                    borderColor: data.borderColor,
                    backgroundColor: data.backgroundColor,
                },
            ]}
        >
            <Text style={styles.itemText}>{data.text}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        paddingHorizontal: padding,
        alignItems: 'center',
        paddingVertical: 10,
        zIndex: 1,
    },
    item: {
        height: itemHeight,
        width: itemWidth,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
        borderWidth: 4,
    },
    itemText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    bgColor: {
        position: 'absolute',
        height: (height * 3) / 2,
        width: (height * 3) / 2,
        borderRadius: height,
    },
    indicatorContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 3,
        backgroundColor: '#444',
    },
});
