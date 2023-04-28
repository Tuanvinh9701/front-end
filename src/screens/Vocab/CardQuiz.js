import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
    Animated,
    Pressable,
} from 'react-native';
import { colors, device, gStyle, images } from '../../constants';
import FlipCard from "react-native-flip-card-plus";
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';

import ModalHeader from '../../components/ModalHeader';

// export default class App extends Component {
const CardQuiz = ({route}) => {
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const cards = route.params['userVocabs'];

    const multiCardRef = [];

    // search start (24 horizontal padding )
    const searchStart = device.width - 48;
    const searchEnd = device.width - 88;

    const opacity = scrollY.interpolate({
        inputRange: [0, 1000],
        outputRange: [searchStart, searchEnd],
        extrapolate: 'clamp'
    });

    const navigation = useNavigation();

    return (
        <View style={gStyle.container}>
            <ModalHeader
                left={<Feather color={colors.greyLight} name="chevron-down" />}
                leftPress={() => navigation.goBack(null)}
                right={<Feather color={colors.greyLight} name="more-horizontal" />}
                text={"Flashcard"}
            />

            <View style={styles.container}>
                <React.Fragment>
                    <Animated.ScrollView
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        stickyHeaderIndices={[1]}
                        style={gStyle.container}
                    >
                        {cards.map((item, index) => {
                            return (
                                <>
                                    <FlipCard
                                        flipDirection={'h'}
                                        style={styles.cardContainer}
                                        onFlipStart={() => console.log('onFlipStart')}
                                        onFlipEnd={() => console.log('onFlipEnd')}
                                        ref={(card) => (multiCardRef['card' + index] = card)}>
                                        <Pressable
                                            style={styles.card}
                                            onLongPress={() => alert('onLongPress')}>
                                            <Text style={styles.label}>{item["es"]}</Text>
                                        </Pressable>
                                        <Pressable style={styles.card} onPress={() => alert('onPress')}>
                                            <Text style={styles.label}>{item["vi"]}</Text>
                                        </Pressable>
                                    </FlipCard>
                                </>
                            );
                        })}
                    </Animated.ScrollView>
                </React.Fragment>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        width: 300,
        height: 470,
        marginTop: '30%',
        marginBottom: '30%',
    },
    card: {
        width: 300,
        height: 470,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#FE474C',
        borderColor: colors.white,
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
    },
    label: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'System',
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    manualTriggers: {
        flexDirection: 'row',
    },
    trigger: {
        backgroundColor: 'black',
        margin: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
    },
});

export default CardQuiz;
