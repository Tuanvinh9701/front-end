import * as React from 'react';
import {
    Animated,
    StyleSheet,
    View,
    Text,
    TextInput,
    Pressable,
    Image
} from 'react-native';
import { colors, device, gStyle, images } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';

import ModalHeader from '../../components/ModalHeader';

const dataRow = [
    { id: 1, avt: "A", name: "Learning English", time: "1h", likes: [{ name: "A" }], comments: [{ name: "A", comment: "ABC" }], save: [{ name: "A" }], contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 2, avt: "A", name: "Learning English", time: "1h", likes: [{ name: "B" }], comments: [{ name: "A", comment: "ABC" }], save: [{ name: "A" }], contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 3, avt: "A", name: "Learning English", time: "1h", likes: [{ name: "C" }], comments: [{ name: "A", comment: "ABC" }], save: [{ name: "A" }], contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
];

  
const ChangeCateScreen = () => {

    const navigation = useNavigation();
    const handleOk = (labelCate) => {
        navigation.navigate("EditPostScreen", { labelCate })
    };
    return (
        <View style={gStyle.container}>
            <View style={styles.containerHeader}>
            <ModalHeader
                left={<Feather color={colors.greyLight} name="x" />}
                leftPress={() => navigation.goBack(null)}
                text={"Choose the type of review"}
            />
            </View>
            <React.Fragment>
                <Animated.ScrollView>
                    <View style={gStyle.spacer1}></View>
                    <Pressable style={styles.btnOk} onPress={() => handleOk("IELTS")}><Text>IELTS</Text></Pressable>
                    <Pressable style={styles.btnOk} onPress={() => handleOk("TOEIC")}><Text>TOEIC</Text></Pressable>
                    <Pressable style={styles.btnOk} onPress={() => handleOk("THPTQG")}><Text>THPTQG</Text></Pressable>
                </Animated.ScrollView>
                
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
    headerInformation: {
        flexDirection: "row",
        padding: "2%",
        alignItems: "center",
    },
    btnOk: {
        width: "90%",
        height: 50,
        backgroundColor: "#f2f2f2",
        borderRadius: 6,
        padding: 10,
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
    }
});
export default ChangeCateScreen;