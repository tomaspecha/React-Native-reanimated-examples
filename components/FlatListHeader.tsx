import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Corrected import

const { width } = Dimensions.get('window');
const headerHeight = 300;
const headerFinalHeight = 70;
const imageSize = (headerHeight / 3) * 2;

type DataType = {
    id: string;
};

const DATA: DataType[] = [
    { id: 'header' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
];

export default function ScrollAnimatedHeader2() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [textWidth, setTextWidth] = useState(0);
    const offset = headerHeight - headerFinalHeight;

    const translateHeader = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [0, -offset],
        extrapolate: 'clamp',
    });

    const translateImageY = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [0, -(headerFinalHeight - headerHeight) / 2],
        extrapolate: 'clamp',
    });

    const translateImageX = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [
            0,
            -(width / 2) + (imageSize * headerFinalHeight) / headerHeight,
        ],
        extrapolate: 'clamp',
    });

    const scaleImage = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [1, headerFinalHeight / headerHeight],
        extrapolate: 'clamp',
    });

    const translateName = scrollY.interpolate({
        inputRange: [0, offset / 2, offset],
        outputRange: [0, 10, -width / 2 + textWidth / 2 + headerFinalHeight],
        extrapolate: 'clamp',
    });

    const scaleName = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [1, 0.8],
        extrapolate: 'clamp',
    });

    const renderItem = ({ index }: { index: number }) => {
        if (index === 0)
            return (
                <Animated.View
                    style={[styles.header, { transform: [{ translateY: translateHeader }] }]}
                >
                    <Animated.View
                        style={[
                            styles.image,
                            {
                                transform: [
                                    { translateY: translateImageY },
                                    { translateX: translateImageX },
                                    { scale: scaleImage },
                                ],
                            },
                        ]}
                    >
                        <Image
                            source={require('../assets/AppAssets/ProfilePhoto.png')}
                            style={styles.img}
                            resizeMode="cover"
                        />
                    </Animated.View>
                    <Animated.Text
                        onTextLayout={(e) => setTextWidth(e.nativeEvent.lines[0].width)}
                        style={[
                            styles.name,
                            { transform: [{ translateX: translateName }, { scale: scaleName }] },
                        ]}
                    >
                        Tomas Pecha
                    </Animated.Text>
                </Animated.View>
            );

        return (
            <LinearGradient
                colors={['#f5f7fa', '#c3cfe2']}
                style={styles.item}
            >
                <Text style={styles.itemText}>Item {index}</Text>
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{index}</Text>
                </View>
            </LinearGradient>
        );
    };

    return (
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            stickyHeaderIndices={[0]}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                useNativeDriver: false,
            })}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        height: 100,
        marginBottom: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    itemText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
    },
    badgeContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#ff5722',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    header: {
        height: headerHeight,
        marginBottom: 5,
        backgroundColor: '#3b5998',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: imageSize,
        width: imageSize,
        borderRadius: headerHeight,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: '#fff',
    },
    img: {
        height: '100%',
        width: '100%',
    },
    name: {
        fontSize: 30,
        color: '#fff',
        position: 'absolute',
        bottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
