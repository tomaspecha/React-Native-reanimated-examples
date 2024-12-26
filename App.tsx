import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import TileScroll from './components/TileScroll';
import ZoomIn from './components/ZoomIn';
import Counter from './components/Counter';
import PanHandlerMove from './components/PanHandlerMove';
import CollapsibleHeader from './components/CollapsibleHeader';
import FlatListHeader from './components/FlatListHeader';
import Swiper from './components/Swiper';
import Scrolling from './components/Scrolling';
import formReanimated from './components/formReanimated';
import ToggleButton from './components/Switch';
import SwiperPagerButton from './components/swiperButton';
import TrackStatus from './components/TrackStatus';
import AnimatedPics from './components/AnimatedPics';
import SwipableList from './components/SwipableList';
import SlideToReturn from './components/SlideToReturn';
import AnimatedText from './components/AnnimatedText';

const Stack = createStackNavigator();

function MainPage({ navigation }) {
    const examples = [
        { label: 'Scrolling Example', image: require('./assets/AppAssets/scrolling.png'), route: 'Scrolling' },
        { label: 'Scale / Zoom Animation', image: require('./assets/AppAssets/scaleZoomIn.png'), route: 'ZoomIn' },
        { label: 'Counter by +1', image: require('./assets/AppAssets/counter.png'), route: 'Counter' },
        { label: 'Pan Handler X and Y', image: require('./assets/AppAssets/panHandlerMovement.png'), route: 'PanHandlerMove' },
        { label: 'Collapsible Header', image: require('./assets/AppAssets/collapsibleHeader.png'), route: 'CollapsibleHeader' },
        { label: 'Profile Header', image: require('./assets/AppAssets/ProfilePhoto.png'), route: 'FlatListHeader' },
        { label: 'Swiper Examples', image: require('./assets/AppAssets/swiper.png'), route: 'Swiper' },
        { label: 'Animated Text', image: require('./assets/AppAssets/AnnimatedText..png'), route: 'AnimatedText' },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Reanimated Examples</Text>
                <Text style={styles.subHeader}>By Tomas Pecha</Text>
            </View>
            <Text style={styles.description}>
                Explore various animations and layouts.
            </Text>
            <View style={styles.gridContainer}>
                {examples.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate(item.route)}
                        style={styles.cardWrapper}
                    >
                        <View style={styles.card}>
                            <Image source={item.image} style={styles.cardImage} />
                            <Text style={styles.cardText}>{item.label}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.footerText}>Navigate Through Examples</Text>
            <View style={styles.pagination}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                    <TouchableOpacity
                        key={number}
                        style={styles.pageButton}
                        onPress={() => {
                            const routes = [
                                'Scrolling',
                                'formReanimated',
                                'ToggleButton',
                                'SwiperPagerButton',
                                'TrackStatus',
                                'AnimatedPics',
                                'SwipableList',
                                'SlideToReturn',
                                'TileScroll', // The ninth button leads to TileScroll
                            ];
                            navigation.navigate(routes[number - 1]);
                        }}
                    >
                        <Text style={styles.pageNumber}>{number}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MainPage" component={MainPage} />
                <Stack.Screen name="Scrolling" component={Scrolling} />
                <Stack.Screen name="ZoomIn" component={ZoomIn} />
                <Stack.Screen name="Counter" component={Counter} />
                <Stack.Screen name="PanHandlerMove" component={PanHandlerMove} />
                <Stack.Screen name="CollapsibleHeader" component={CollapsibleHeader} />
                <Stack.Screen name="FlatListHeader" component={FlatListHeader} />
                <Stack.Screen name="Swiper" component={Swiper} />
                <Stack.Screen name="formReanimated" component={formReanimated} />
                <Stack.Screen name="ToggleButton" component={ToggleButton} />
                <Stack.Screen name="SwiperPagerButton" component={SwiperPagerButton} />
                <Stack.Screen name="TrackStatus" component={TrackStatus} />
                <Stack.Screen name="AnimatedPics" component={AnimatedPics} />
                <Stack.Screen name="SwipableList" component={SwipableList} />
                <Stack.Screen name="SlideToReturn" component={SlideToReturn} />
                <Stack.Screen name="AnimatedText" component={AnimatedText} />
                <Stack.Screen name="TileScroll" component={TileScroll} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f7f9fc',
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1a73e8',
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4f4f4f',
    },
    description: {
        fontSize: 16,
        color: '#5f6368',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 20,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    cardWrapper: {
        margin: 10,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 4,
    },
    card: {
        backgroundColor: '#ffffff',
        width: 140,
        height: 160,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginBottom: 10,
    },
    cardText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    footerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#5f6368',
        textAlign: 'center',
        marginVertical: 10,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    pageButton: {
        marginHorizontal: 5,
        backgroundColor: '#e1f5fe',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    pageNumber: {
        fontSize: 16,
        color: '#1a73e8',
        fontWeight: '600',
        textAlign: 'center',
    },
});
