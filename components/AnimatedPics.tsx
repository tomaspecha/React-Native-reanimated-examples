import React, { Component, useEffect, useState, createRef } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    LayoutAnimation,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View,
} from 'react-native';

const { width } = Dimensions.get('screen');

// Data array with paths to images
const data = [
    require('../assets/AppAssets/1.png'),
    require('../assets/AppAssets/2.png'),
    require('../assets/AppAssets/3.png'),
    require('../assets/AppAssets/4.png'),
    require('../assets/AppAssets/5.png'),
    require('../assets/AppAssets/6.png'),
    require('../assets/AppAssets/7.png'),
    require('../assets/AppAssets/8.png'),
    require('../assets/AppAssets/9.png'),
    require('../assets/AppAssets/10.png'),
    require('../assets/AppAssets/11.png'),
    require('../assets/AppAssets/12.png'),
    require('../assets/AppAssets/13.png'),
];

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

type LayoutData = {
    x: number;
    y: number;
    _width: number;
    _height: number;
    index: number; // Added index to track which image is active
};

type ModalViewProps = {
    layoutData: LayoutData;
    close: () => void;
};

type RenderItemProps = {
    toggleModal: (data: LayoutData) => void;
    image: any;
    index: number;
};

export default function AnimatedPics() {
    const [layoutData, setData] = useState<LayoutData | null>(null);

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                contentContainerStyle={styles.listContainer}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <RenderItem
                        toggleModal={(data) => setData(data)}
                        image={item}
                        index={index}
                    />
                )}
                numColumns={2}
            />
            {layoutData && <ModalView layoutData={layoutData} close={() => setData(null)} />}
        </View>
    );
}

function ModalView({ layoutData, close }: ModalViewProps) {
    const { x, y, _width, _height, index } = layoutData;
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            setExpanded(true);
        }, 10);
    }, []);

    const onRequestClose = () => {
        LayoutAnimation.configureNext(
            LayoutAnimation.create(
                150,
                LayoutAnimation.Types.easeInEaseOut,
                LayoutAnimation.Properties.opacity,
            ),
            () => {
                close();
            },
        );
        setExpanded(false);
    };

    return (
        <Modal visible onRequestClose={onRequestClose} transparent>
            <View style={styles.modalContainer}>
                {expanded && <Animated.View style={[StyleSheet.absoluteFill, styles.overlay]} />}
                <View
                    style={[
                        expanded
                            ? styles.expandedModal
                            : {
                                height: _height,
                                width: _width,
                                left: x,
                                top: y,
                                position: 'absolute',
                            },
                        styles.modalContent,
                    ]}
                >
                    <Image
                        source={data[index]} // Use the index to display the correct image
                        resizeMode="cover"
                        style={styles.fill}
                    />
                    {expanded && (
                        <View style={styles.closeButton}>
                            <TouchableOpacity onPress={onRequestClose} style={styles.closeTouchable}>
                                <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
}

class RenderItem extends Component<RenderItemProps> {
    itemRef: React.RefObject<View>;

    constructor(props: RenderItemProps) {
        super(props);
        this.itemRef = createRef();
    }

    onPress = () => {
        const { toggleModal, index } = this.props;
        if (this.itemRef.current) {
            this.itemRef.current.measureInWindow((x: number, y: number, _width: number, _height: number) => {
                toggleModal({ x, y, _width, _height, index });
            });
        }
    };

    render() {
        const { image } = this.props;
        return (
            <View style={styles.item}>
                <TouchableOpacity
                    ref={this.itemRef}
                    style={styles.itemTouchable}
                    onPress={this.onPress}
                    onLongPress={this.onPress}
                    activeOpacity={0.8}
                >
                    <Image
                        source={image}
                        resizeMode="cover"
                        style={styles.fill}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f9fc',
    },
    listContainer: {
        paddingVertical: 20,
    },
    item: {
        height: width / 2.5,
        flex: 1,
        padding: 10,
    },
    itemTouchable: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    fill: {
        height: '100%',
        width: '100%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
    },
    expandedModal: {
        height: '90%',
        width: '95%',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
    },
    closeTouchable: {
        backgroundColor: '#ff5a5f',
        padding: 8,
        borderRadius: 8,
    },
    closeText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
});
