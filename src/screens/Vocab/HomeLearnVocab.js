import * as React from 'react';
import {
    Animated,
    StyleSheet,
    View,
    Text,
    FlatList,
    Pressable
} from 'react-native';
import { colors, device, gStyle, images } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';

import ModalHeader from '../../components/ModalHeader';
import { createAPIEndpoint, BASE_URL } from '../../api'
import Context from '../../context';
// components
import LineItemVocab from '../../components/LineItemVocab';

const HomeLearnVocab = () => {

    const [userVocabs, setUserVocabs] = React.useState([]);
    const { user_id } = React.useContext(Context);
    React.useEffect(() => {
        createAPIEndpoint('get_all_vocabs_of_user')
            .fetchById(user_id)
            .then(res => {
                setUserVocabs(res.data);
            })
            .catch(err => { console.log(err); })
    }, [])
    console.log("-----------------");
    console.log(userVocabs);

    const scrollY = React.useRef(new Animated.Value(0)).current;

    // search start (24 horizontal padding )
    const searchStart = device.width - 48;
    const searchEnd = device.width - 88;

    const opacity = scrollY.interpolate({
        inputRange: [0, 48],
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
                text={"Your vocabulary"}
            />
            <React.Fragment>
                <View style={gStyle.spacer2} />
                <View style={styles.containerVocab}>
                    <Text style={styles.textLarge}>You have {userVocabs.length} vocabs</Text>
                    <Text style={styles.textSmall}>Click here to see meanings</Text>
                    <View style={gStyle.spacer1} />
                    <Pressable style={styles.vocabView} onPress={() => navigation.navigate('CardQuiz', {userVocabs: userVocabs})}>
                        <View>
                            <Text style={styles.textLarge}>My vocabulary</Text>
                            <Text style={styles.textSmall}>0/{userVocabs.length} Learned vocabulary</Text>
                            <View style={styles.line}></View>
                        </View>
                    </Pressable>
                    <FlatList
                        contentContainerStyle={styles.containerFlatlist}
                        data={userVocabs}
                        renderItem={({ item }) => {
                            return (
                                <LineItemVocab
                                    vi={item.vi}
                                    es={item.es}
                                />
                            )
                        } }
                    />
                </View>
                <Pressable style={styles.footer} onPress={() => navigation.navigate('CardQuiz', {userVocabs: userVocabs})}>
                    <Text style={styles.textLarge}>Learn vocabs</Text>
                </Pressable>
            </React.Fragment>
        </View>
    );
};

const styles = StyleSheet.create({
    searchPlaceholder: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 6,
        flexDirection: 'row',
        paddingLeft: 16,
        paddingVertical: 16
    },
    containerFlatlist: {
        marginTop: 10
    },
    searchPlaceholderText: {
        ...gStyle.textGroup716,
        color: colors.blackBg
    },
    sectionHeading: {
        ...gStyle.textGroup7Bold18,
        color: colors.white,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 16
    },
    containerVocab: {
        padding: 20
    },
    footer: {
        height: 50,
        width: '90%',
        position: 'absolute',
        bottom: 70,
        backgroundColor: 'green',
        left: "5%",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    vocabView: {
        height: 150,
        width: '100%',
        backgroundColor: colors.greyOff,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.white,
        paddingTop: 30,
        paddingLeft: 20,
    },
    textLarge: {
        fontSize: 20,
        color: colors.white,
    },
    textSmall: {
        fontSize: 15,
        marginTop: 10,
        color: colors.greyLight,
    },
    line: {
        height: 10,
        width: '92%',
        backgroundColor: colors.greyLight,
        borderRadius: 10,
        marginTop: 10,
    }
});

export default HomeLearnVocab;
