import * as React from 'react';
import {
    Animated,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { colors, device, gStyle, images } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import ModalHeader from '../../components/ModalHeader';
import { createAPIEndpoint, BASE_URL } from '../../api'
const dataRow = [
    { post_id: 1, avt: "A", username: "Learning English", time: "1h", post_like: [{ name: "A" }], post_comment: [{ name: "A", comment: "ABC" }], post_save: [{ name: "A" }], content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incpost_idpost_idunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cuppost_idatat non propost_ident, sunt in culpa qui officia deserunt mollit anim post_id est laborum." },
    { post_id: 1003897, avt: "A", username: "Learning English", time: "1h", post_like: [{ name: "B" }], post_comment: [{ name: "A", comment: "ABC" }], post_save: [{ name: "A" }], content: "Qìhowfnkw su qnsiqnsiqbd dhem qdhoqbdiq. Qnod. Qhdoqdbidb sqinsonxq iqsbiqsbi nãoqn" },
    { post_id: 3, avt: "A", username: "Learning English", time: "1h", post_like: [{ name: "C" }], post_comment: [{ name: "A", comment: "ABC" }], post_save: [{ name: "A" }], content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
];

const CommentScreen = (route) => {
    const id = route.route.params.index;
    const [data, setData] = React.useState([]);
    const [dataPost, setDataPost] = React.useState(dataRow);

    React.useEffect(() => {
        createAPIEndpoint('get_all_post')
        .fetch() 
        .then(res => {
            console.log(res.data)
            // setDataPost(res.data[res.data.findIndex((item) => item.post_id === id)]);
        })
        .catch(err => { console.log(err); })
    }, [])

    // React.useEffect(() => {
    //     createAPIEndpoint('get_all_post')
    //     .fetch() 
    //     .then(res => {
    //         // setData(res.data);
    //         console.log(res.data)
    //         setDataPost(res.data[res.data.findIndex((item) => item.post_id === id)]);
    //     })
    //     .catch(err => { console.log(err); })
    // }, [])

    console.log(dataPost)
    // const dataPost = data[data.findIndex((item) => item.id === id)];

    const [keyboardOffset, setKeyboardOffset] = React.useState(5);

    const [isKeyboardOffset, setIsKeyboardOffset] = React.useState(false);

    const [isLikes, setIsLikes] = React.useState([]);

    const navigation = useNavigation();

    const handleComment = (index) => {
        navigation.navigate("CommentScreen", { index });
    };

    const focusKeyBoard = () => {
        setKeyboardOffset(335);
    };

    const notFocusKeyBoard = () => {
        setKeyboardOffset(5);
    };

    const handleLike = (index) => {
        if (!isLikes.includes(index)) {
            setIsLikes([...isLikes, index]);
        } else {
            setIsLikes(isLikes.filter((item) => item !== index));
        }
    };

    const handleSave = (index) => {
        console.log("Save: ", index);
    };


    return (
        <View style={gStyle.container}>
            <ModalHeader
                left={<Feather color={colors.greyLight} name="chevron-down" />}
                leftPress={() => navigation.goBack(null)}
                right={<Feather color={colors.greyLight} name="more-horizontal" />}
                text={dataPost[0].username}
            />
            <React.Fragment>
                <Animated.ScrollView automaticallyAdjustKeyboardInsets={true}>
                    <View style={styles.contentView}>
                        <Text style={styles.contentText}>{dataPost[0].content}</Text>
                    </View>
                    <View style={styles.imageView}>
                        <Image source={images['logo']} style={styles.imagePost} />
                    </View>
                    <View style={styles.likeView}>
                        <Pressable style={styles.iconEmotion} onPress={() => handleLike(dataPost[0].post_id)}>
                            <Ionicons name={isLikes.includes(dataPost[0].post_id) ? "heart-sharp" : "heart-outline"} size={23} color={colors.greyLight}></Ionicons>
                            <Text style={{ color: colors.greyLight, marginLeft: 5 }}>Like</Text>
                        </Pressable>
                        <Pressable style={styles.iconEmotion} onPress={() => handleComment(dataPost[0].post_id)}>
                            <Ionicons name={"chatbubble-outline"} size={23} color={colors.greyLight}></Ionicons>
                            <Text style={{ color: colors.greyLight, marginLeft: 5 }}>Comment</Text>
                        </Pressable>
                        <Pressable style={styles.iconEmotion} onPress={() => handleSave(dataPost[0].post_id)}>
                            <Ionicons name={"arrow-redo-outline"} size={23} color={colors.greyLight}></Ionicons>
                            <Text style={{ color: colors.greyLight, marginLeft: 5 }}>Save</Text>
                        </Pressable>
                    </View>
                    <View style={styles.lineBottom}>
                        {/* <Text style={{ color: colors.greyLight }}>{dataPost.post_like.length} likes, {dataPost.post_save.length} saves</Text> */}
                    </View>
                    <View style={styles.lineView}></View>
                    <View style={styles.commentView}>
                        {dataPost[0].post_comment.map((item) => (
                            <View style={styles.comment} key={item.userNameComment}>
                                <View style={styles.avtComment}></View>
                                <View style={styles.commentRight}>
                                    <View style={styles.commentRightTop}>
                                        <Text style={styles.nameText}>{item.userNameComment}</Text>
                                        <Text style={styles.contentText}>{item.comment}</Text>
                                    </View>
                                    <View style={styles.commentRightBottom}>
                                        <Text style={{ color: colors.greyLight, marginRight: 15 }}>1h</Text>
                                        <Text style={{ color: colors.white }}>Like</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </Animated.ScrollView>
                <View style={[styles.commentInputView, {
                    position: 'absolute',
                    width:    '100%',
                    bottom:   keyboardOffset
                    }]} >
                    <View style={styles.commentInputInsideView}>
                        <View style={styles.iconEnter}>
                            <TextInput onFocus={() => focusKeyBoard() }
                                        onBlur={() => notFocusKeyBoard() } style={styles.input} placeholder="Write a comment..." placeholderTextColor={colors.white}></TextInput>
                        </View >
                        <View style={styles.iconEnter}>
                            <Ionicons name={"arrow-redo-outline"} size={23} color={colors.greyLight}></Ionicons>
                        </View>
                    </View>
                </View>
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
    headerInput: {
        flexDirection: "row",
        backgroundColor: colors.grey3,
        width: '100%',
        padding: "2%",
        alignItems: "center",
        height: 70,
    },
    avt: {
        width: "14%",
        height: 50,
        backgroundColor: colors.brandPrimary,
        borderRadius: 50,
        marginLeft: 10,
    },
    input: {
        width: '100%',
        height: '100%'
    },
    search: {
        width: "14%",
        // height: 0,
        paddingTop: 10
    },
    iconImageUpload: {
        width: "100%",
        height: 50,
    },
    contentView: {
        marginTop: 5,
        width: "100%",
        padding: 10,
    },
    headerAvt: {
        flexDirection: "row",
        width: "100%",
        height: 50,
        alignItems: "center",
    },
    headerRight: {
        marginLeft: 10,
    },
    timeView: {
        flexDirection: "row",
    },
    nameText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: "bold",
    },
    timeText: {
        color: colors.white,
        fontSize: 12,

    },
    iconGlobal: {
        marginLeft: 5,
    },
    content: {
        marginTop: 10,
    },
    contentText: {
        color: colors.white,
        fontSize: 15,
        // textAlign: "justify",

    },
    imageView: {
        width: "100%",
        height: 300,
    },
    imagePost: {
        width: "100%",
        height: "100%",
    },
    likeView: {
        flexDirection: "row",
        width: "100%",
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: "space-around",
        // borderBottomColor: colors.greyLight,
        // borderBottomWidth: 1,
    },
    iconEmotion: {
        marginRight: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    lineBottom: {
        paddingBottom: 10,
        alignSelf: 'flex-end',
        marginRight: 25
    },
    lineView: {
        height: 1,
        width: "100%",
        backgroundColor: colors.greyLight,
    },
    commentView: {
        marginTop: 10,
    },
    comment: {
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 10,
    },
    avtComment: {
        width: 40,
        height: 40,
        backgroundColor: "red",
        borderRadius: 50,
        marginRight: 10,
    },
    commentRight: {
        width: "80%",
    },
    commentRightTop: {
        borderRadius: 10,
        padding: 8,
        backgroundColor: colors.greySwitchBorder,
        color: colors.white,
    },
    commentRightBottom: {
        flexDirection: "row",
        marginTop: 5
    },
    commentInputView: {
        padding: 10,
        paddingRight: 20,
        paddingLeft: 20,
        height: 70,
        backgroundColor: colors.grey3,
    },
    commentInputInsideView: { 
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#808080",
        borderRadius: 50,
        paddingRight: 10,
        paddingLeft: 8,
    }

});
export default CommentScreen;