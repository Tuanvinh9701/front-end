import * as React from 'react';
import {
    Animated,
    StyleSheet,
    View,
    Text,
    TextInput,
    RefreshControl,
    Image
} from 'react-native';
import { colors, device, gStyle, images } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";

import ScreenHeader from '../../components/ScreenHeader';
import { Pressable } from 'react-native';
import Context from '../../context';

import { LinearGradient } from 'expo-linear-gradient';

import { createAPIEndpoint, BASE_URL } from '../../api'

// const dataRow = [
//     { id: 1, avt: "A", name: "Learning English", time: "1h", likes: [{ name: "A" }], comments: [{ name: "A", comment: "ABC" }], save: [{ name: "A" }], contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
//     { id: 2, avt: "A", name: "Learning English", time: "1h", likes: [{ name: "B" }], comments: [{ name: "A", comment: "ABC" }], save: [{ name: "A" }], contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
//     { id: 3, avt: "A", name: "Learning English", time: "1h", likes: [{ name: "C" }], comments: [{ name: "A", comment: "ABC" }], save: [{ name: "A" }], contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
// ];

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
  
const PostScreen = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = React.useState([]);
    const { user_id } = React.useContext(Context);
    const [isReLoading, setIsReloading] = React.useState(false);
    const [topGenres, setTopGenres] = React.useState([]);

    React.useEffect(() => {
        createAPIEndpoint('get_all_post')
        .fetch() 
        .then(res => {
            setData(res.data);
        })
        createAPIEndpoint('get_all_cate_books')
            .fetch()
            .then(res => {
            setTopGenres(res.data);
            })
    }, [isReLoading])
    // React.useEffect(() => {
    //     setData(data);
    // }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setIsReloading(!isReLoading);
        wait(2000).then(() => {
            createAPIEndpoint('get_all_post')
            .fetch() 
            .then(res => {
                setData(res.data);
            })
            setRefreshing(false)
        });
    }, []);
    
    const [textShown, setTextShow] = React.useState(-1);

    const [isLikes, setIsLikes] = React.useState([]);

    const navigation = useNavigation();

    const toggleNumberofLines = (index) => {
        setTextShow(textShown === index ? -1 : index);
    };

    const handleEditPost = () => {
        var labelCate = "";
        navigation.navigate("EditPostScreen", { labelCate })
    };

    const handleComment = (index) => {
        navigation.navigate("CommentScreen", { index });
    };

    const handleLike = (index) => {
        setIsReloading(!isReLoading);
        if (!isLikes.includes(index)) {
            setIsLikes([...isLikes, index]);
            createAPIEndpoint('update_like/')
            .put(index, { 'datalike': { 'user_id' :user_id} })
            .then(res => {
                console.log(res.data);
            })

        } else {
            setIsLikes(isLikes.filter((item) => item !== index));

        }
    };

    const handleSave = (index) => {
        console.log("Save: ", index);
    };

    const changeDataPost = (label) => {
        createAPIEndpoint('get_post_with_cate')
        .fetchById(label) 
        .then(res => {
            setData(res.data);
        })
    };
    return (
        <View style={gStyle.container}>
            <View style={styles.containerHeader}>
                <ScreenHeader title="Learning English" />
            </View>
            <React.Fragment>
                <Animated.ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {refreshing ? <View style={styles.loading}><Text style={{color: colors.white}}>{refreshing ? "Loading ..." : ""}</Text></View> : null}
                    <View style={styles.headerInput}>
                        <View style={styles.avt}></View>
                        <TextInput onFocus={() => handleEditPost()} style={styles.input} placeholder="What's on your mind?" placeholderTextColor={colors.white}></TextInput>
                        <View style={styles.search}>
                            <Ionicons name={"images-outline"} size={35} color={"green"} style={styles.iconImageUpload}></Ionicons>
                        </View>
                    </View>
                    <View style={styles.storyView}>
                        
                    <Animated.ScrollView horizontal={true}>
                            <Pressable onPress={() => changeDataPost("IELTS")}>
                                <LinearGradient colors={['#93C6F9', '#97B4FA', '#A768FE']}
                                    start={[0, 0]}
                                    end={[1, 1]}
                                    location={[0.25, 0.4, 1]} 
                                    style={styles.story}>

                                    <Text style={{color: colors.white}}>IELTS</Text>
                                </LinearGradient>
                            </Pressable>
                            <Pressable onPress={() => changeDataPost("TOEIC")}>
                                <LinearGradient colors={['#93C6F9', '#97B4FA', '#A768FE']}
                                    start={[0, 0]}
                                    end={[1, 1]}
                                    location={[0.25, 0.4, 1]} 
                                    style={styles.story}>

                                    <Text style={{color: colors.white}}>TOEIC</Text>
                                </LinearGradient>
                            </Pressable>
                            <Pressable onPress={() => changeDataPost("THPTQG")}>
                                <LinearGradient colors={['#93C6F9', '#97B4FA', '#A768FE']}
                                    start={[0, 0]}
                                    end={[1, 1]}
                                    location={[0.25, 0.4, 1]} 
                                    style={styles.story}>

                                    <Text style={{color: colors.white}}>THPTQG</Text>
                                </LinearGradient>
                            </Pressable>
                        </Animated.ScrollView>
                    </View>
                    {
                        data.map((item) => (
                            <View style={styles.contentView} key={item.post_id}>
                                <View style={styles.headerAvt}>
                                    <View style={styles.avt}></View>
                                    <View style={styles.headerRight}>
                                        <Text style={styles.nameText}>{item.userName}</Text>
                                        <View style={styles.timeView}>
                                            <Text style={styles.timeText}>1m . </Text>
                                            <Ionicons name={ item.isPublic ? "earth-outline" : "lock-closed-outline"} size={15} color={colors.white} style={styles.iconGlobal}></Ionicons>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.content}>
                                    <Text
                                        numberOfLines={textShown === item.post_id ? undefined : 3}
                                        style={styles.contentText}>
                                        {item.content}
                                    </Text>
                                    <Text
                                        onPress={() => toggleNumberofLines(item.post_id)}
                                        style={{ color: colors.greyLight }}>
                                        {textShown === item.post_id ? 'Read less...' : 'Read more'}
                                    </Text>
                                </View>
                                <View style={styles.imageView}>
                                    <Image source={{ uri: BASE_URL + "get_image/" + item.imageUrl }} style={styles.imagePost} />
                                </View>
                                <View style={styles.likeView}>
                                    <Pressable style={styles.iconEmotion} onPress={() => handleLike(item.post_id)}>
                                        <Ionicons name={isLikes.includes(item.post_id) ? "heart-sharp" : "heart-outline"} size={23} color={colors.greyLight}></Ionicons>
                                        <Text style={{ color: colors.greyLight, marginLeft: 5 }}>Like</Text>
                                    </Pressable>
                                    <Pressable style={styles.iconEmotion} onPress={() => handleComment(item.post_id)}>
                                        <Ionicons name={"chatbubble-outline"} size={23} color={colors.greyLight}></Ionicons>
                                        <Text style={{ color: colors.greyLight, marginLeft: 5 }}>Comment</Text>
                                    </Pressable>
                                    <Pressable style={styles.iconEmotion} onPress={() => handleSave(item.post_id)}>
                                        <Ionicons name={"arrow-redo-outline"} size={23} color={colors.greyLight}></Ionicons>
                                        <Text style={{ color: colors.greyLight, marginLeft: 5 }}>Save</Text>
                                    </Pressable>
                                </View>
                                <View style={styles.lineBottom}>
                                    <Text style={{ color: colors.greyLight }}>{item.post_like.length} likes, {item.post_save.length} saves</Text>
                                </View>
                                <View style={styles.commentView}>
                                    {item.post_comment.map((itemComment) => (
                                        <View style={styles.comment} key={itemComment.name}>
                                            <View style={styles.avtComment}></View>
                                            <View style={styles.commentRight}>
                                                <View style={styles.commentRightTop}>
                                                    <Text style={styles.nameText}>{itemComment.name}</Text>
                                                    <Text style={styles.contentText}>{itemComment.comment}</Text>
                                                </View>
                                                <View style={styles.commentRightBottom}>
                                                    <Text style={{ color: colors.greyLight, marginRight: 15 }}>1h</Text>
                                                    <Text style={{ color: colors.white }}>Like</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}

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
    headerInput: {
        flexDirection: "row",
        backgroundColor: colors.grey3,
        width: '100%',
        padding: "2%",
        alignItems: "center",
        height: 70,
    },
    loading: {
        width: "100%",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
    },
    avt: {
        width: "14%",
        height: 50,
        backgroundColor: colors.brandPrimary,
        borderRadius: 50,
        marginLeft: 10,
    },
    input: {
        width: '70%',
        padding: 10,
        height: 50,
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
    storyView: {
        marginTop: 5,
        width: "100%",
        height: 150,
        backgroundColor: colors.grey3,
        padding: 10,
    },
    story: {
        width: 90,
        height: "100%",
        backgroundColor: colors.grey3,
        borderRadius: 10,
        borderColor: "green",
        borderWidth: 1,
        marginRight: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    contentView: {
        marginTop: 5,
        width: "100%",
        backgroundColor: colors.grey3,
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
        borderBottomColor: colors.greyLight,
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingLeft: 5,
    },
    commentView: {
        marginTop: 10,
    },
    comment: {
        flexDirection: "row",
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
    }

});
export default PostScreen;