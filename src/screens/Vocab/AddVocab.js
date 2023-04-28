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
import { Feather, Ionicons } from '@expo/vector-icons';
import * as tf from "@tensorflow/tfjs";
import { fetch } from "@tensorflow/tfjs-react-native";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as Location from 'expo-location';
import * as jpeg from "jpeg-js";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";

import ModalHeader from '../../components/ModalHeader';


const onProcessUploadImage = () => {
    console.log('upload image');
}

const AddVocab = () => {
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const [isTfReady, setIsTfReady] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [isModelReady, setIsModelReady] = React.useState(false);
    const [predictions, setPredictions] = React.useState(null);
    const [mobileModel, setMobileModel] = React.useState(null);
    const [cameraOpen, setCameraOpen] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    // load model
    React.useEffect(() => {
        (async () => {
            await tf.ready();
            setIsTfReady(true);
            const model = await mobilenet.load();
            console.log("Load ok")
            await setMobileModel(model);
            setIsModelReady(true);
        })();
        getPermissionAsync();
        if (image) setModalVisible(true);
    }, [
        tf,
        mobilenet,
        setIsTfReady,
        setMobileModel,
        setIsModelReady,
        getPermissionAsync,
        setModalVisible,
        predictions,
    ]);

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!");
            }
        }
    };


    const imageToTensor = (rawImageData) => {
        const TO_UINT8ARRAY = true;
        const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
        // Drop the alpha channel info for mobilenet
        const buffer = new Uint8Array(width * height * 3);
        let offset = 0; // offset into original data
        for (let i = 0; i < buffer.length; i += 3) {
            buffer[i] = data[offset];
            buffer[i + 1] = data[offset + 1];
            buffer[i + 2] = data[offset + 2];

            offset += 4;
        }

        return tf.tensor3d(buffer, [height, width, 3]);
    };

    const classifyImage = async (source) => {
        try {
            const imageAssetPath = await Image.resolveAssetSource(source);
            const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
            const rawImageData = await response.arrayBuffer();
            const imageTensor = await imageToTensor(rawImageData);
            const predictions = await mobileModel.classify(imageTensor);
            console.log("Predictions: ", predictions[0].className);
            setPredictions(predictions);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const selectImage = async () => {
        try {
            let response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
            });

            if (!response.cancelled) {
                const source = { uri: response.uri };
                await setImage(source);
                await setIsLoading(true);
                classifyImage(source);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const photoPrediction = async (source) => {
        await setImage(source);
        await setIsLoading(true);
        await setCameraOpen(true);
        setCameraOpen(false);
        classifyImage(source);
    };

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
                text={"Add new word"}
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
                    <View style={gStyle.spacer11} />
                    <View style={styles.containerSearchBar}>
                    </View>

                    <Text style={styles.sectionHeading}>Add words</Text>
                    <View style={styles.containerRow}>
                        <View style={[styles.container, styles.imageView]}>
                            <Image source={image !== null ? image : images['logo']} style={styles.image} />
                        </View>
                        {cameraOpen && (
                            <View>
                                <CameraView
                                    setImage={(source) => photoPrediction(source)}
                                    setCameraOpen={() => setCameraOpen(!cameraOpen)}
                                />
                            </View>
                        )}
                        <View style={[styles.container, styles.imageView]}>
                            <TouchableOpacity
                                onPress={isModelReady ? selectImage : undefined}
                            >
                                {isModelReady && isLoading ? (
                                    <View style={styles.btn_upload}>
                                        <Text style={styles.btnText}>
                                            <Ionicons style={styles.btnIcon} color={colors.white} name="image" size={40} />Load picture</Text>
                                    </View>
                                ) : (
                                    <View>
                                        {isModelReady ? (
                                            <View style={styles.btn_upload}>
                                                <Text style={styles.btnText}>
                                                    <Ionicons style={styles.btnIcon} color={colors.white} name="image" size={40} />Upload picture</Text>
                                            </View>
                                        ) : (
                                            <View style={styles.btn_upload}>
                                                <Text style={styles.btnText}>Loading model ...</Text>
                                                <ActivityIndicator
                                                    size="small"
                                                />
                                            </View>
                                        )}
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.container}>
                        <View style={gStyle.flex1}>
                            <Text style={styles.title_content}>Vocabulary</Text>
                            <TextInput style={styles.input} value={(predictions !== null) ? predictions[0].className : "hello"}></TextInput>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={gStyle.flex1}>
                            <Text style={styles.title_content}>Meanings</Text>
                            <TextInput style={styles.input} placeholder="xin chào" placeholderTextColor="white" ></TextInput>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Pressable style={styles.btn} onPress={() => navigation.navigate('TabNavigation')}>
                            <Text style={styles.btnText}>Update</Text>
                        </Pressable>
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
    containerColumn: {
        width: '30%'
    },
    imageView: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginRight: 10,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center'
    },

    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 25,
        paddingLeft: 25,
        paddingTop: 20,
        width: '100%'
    },
    btnIcon: {
        marginRight: 10,
        fontSize: 14,
    },
    btn_upload: {
        flexDirection: 'row',
        backgroundColor: colors.brandPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        height: 40,
        padding: 10,
        // width: '70%',
    },
    btn: {
        backgroundColor: colors.brandPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginTop: 15,
        height: 50,
        width: '100%',
    },
    btnText: {
        ...gStyle.textGroup7Bold16,
        color: colors.white,
        letterSpacing: 1,
        textTransform: 'uppercase',
        fontSize: 14,
    },
    title_label: {
        ...gStyle.textGroup716,
        color: colors.white,
        fontWeight: "bold",
    },
    title_content: {
        ...gStyle.textGroup716,
        color: colors.white,
    },
    input: {
        width: "100%",
        borderRadius: 5,
        borderColor: "white",
        color: "white",
        borderWidth: 1,
        marginTop: 10,
        padding: 12,
    },
});

export default AddVocab;
