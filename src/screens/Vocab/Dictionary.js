import * as React from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    Image,
    View,
    Pressable,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { colors, device, gStyle, images } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import Ionicons from 'react-native-vector-icons/Ionicons';

import * as ImagePicker from 'expo-image-picker';
import ModalHeader from '../../components/ModalHeader';
import * as Clipboard from 'expo-clipboard';
import * as Speech from 'expo-speech';
import axios from 'axios';

import { createAPIEndpoint, BASE_URL } from '../../api'

const Dictionary = () => {
    const [text, setText] = React.useState("");
    const [textResult, setTextResult] = React.useState("");
    const [image, setImage] = React.useState(null);

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

    const onPressEngViet = () => {
        var vocab = {
            content: text
        }
        axios.post(BASE_URL + `translate_eng_vn`,  {vocab} )
        .then(res => {
            setTextResult(res.data['reply']);
        })
    }
    const onPressVietEng = () => {
        var vocab = {
            content: text
        }
        axios.post(BASE_URL + `translate_vn_eng`,  {vocab} )
        .then(res => {
            setTextResult(res.data['reply']);
        })
    }
    const onPressCancel = () => {
        setText("");
        setTextResult("");
    }

    const uploadImageAsync = async (result) => {
        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('image', { uri: localUri, name: filename, type });

        return await fetch(BASE_URL + "uploadImage", {
            method: 'POST',
            body: formData,
            headers: {
            'content-type': 'multipart/form-data',
            },
        });
    };

    const onOCR = (filename) => {
        createAPIEndpoint('OCR')
        .fetchById(filename) 
        .then(res => {
            setText(res.data['reply']);
        })
    }

    const onImageOCR = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
  
          // console.log(result);
          
          if (!result.canceled) {
              setImage(result);
          }
          if (result.cancelled === false) {
            await uploadImageAsync(result)
            onOCR(result.uri.split('/').pop());
          };
    }

    const onCopy = async () => {
        await Clipboard.setStringAsync(textResult);
        alert("Copied in clipboard!");
    }

    const onPressSpeaking = async () => {
        Speech.speak(text, { language: 'en' });
    }

    return (
        <View style={gStyle.container}>
            <ModalHeader
                left={<Feather color={colors.greyLight} name="chevron-down" />}
                leftPress={() => navigation.goBack(null)}
                right={<Feather color={colors.greyLight} name="more-horizontal" />}
                text={"Translate"}
            />
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
                    <View style={styles.containerSearchBar}>
                    </View>

                    <View style={styles.componentView}>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    placeholder="Type here to translate!"
                    placeholderTextColor="#656565"
                    color="#DEDEDE"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => setText(text)}
                    value={text}
                />
                <View style={styles.iconCancel}><Ionicons onPress={onPressCancel} color={'#DEDEDE'} size={30} name="close-outline"></Ionicons></View>
                <View style={styles.iconVolume}><Ionicons onPress={onPressSpeaking} color={'#DEDEDE'} size={25} name="volume-high"></Ionicons></View>
                    </View>

                    <View style={styles.itemView}>
                        {/* <View style={styles.itemIcon}><Ionicons color={'#DEDEDE'} size={20} name="mic"></Ionicons></View> */}
                        <View style={styles.itemIcon}><Ionicons color={'#DEDEDE'} size={20} name="images-sharp" onPress={onImageOCR}></Ionicons></View>
                        <View style={styles.itemIcon}><Ionicons color={'#DEDEDE'} size={20} name="camera"></Ionicons></View>
                    </View>

                    <View style={styles.translaterView}>
                        <Pressable onPress={onPressEngViet} style={styles.engVietView}><Text style={styles.engVietText}>Eng - Viet</Text></Pressable>
                        <Pressable onPress={onPressVietEng} style={styles.engVietView}><Text style={styles.engVietText}>Viet - Eng</Text></Pressable>
                    </View>
                    <View style={styles.componentView}>
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            color="#DEDEDE"
                            underlineColorAndroid='transparent'
                            editable={false} selectTextOnFocus={false}
                            value={textResult}
                        />
                        <View style={styles.iconCancel}><Ionicons onPress={onCopy} color={'#DEDEDE'} size={20} name="copy-outline"></Ionicons></View>
                    </View>
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
    containerRow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    componentView: {
        marginTop: 20,
        backgroundColor: '#272727',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: 'red',
    },
    input: {
        width: '100%',
        height: 110
    },
    iconCancel: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    iconVolume: {
        position: 'absolute',
        right: 10,
        top: 50
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    itemIcon: {
        marginLeft: 10,
        padding: 10,
        borderRadius: 20,
        shadowColor: 'red',
        borderWidth: 1,
        borderColor: '#DEDEDE'
    },
    translaterView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    engVietView: {
        width: '48%',
        height: 50,
        backgroundColor: '#0754A6',
        borderRadius: 5,
        shadowColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    engVietText: {
        color: '#DEDEDE',
        fontSize: 20
    }
});

export default Dictionary;
