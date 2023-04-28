import * as React from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    Image,
    View,
    Pressable,
    TextInput,
} from 'react-native';
import { colors, device, gStyle, images } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ModalLgout = () => {
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState(null);
    const [message, setMessage] = React.useState(null);

    const validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setError("Invalid Email");
            setEmail(text)
            return false;
        }
        else {
            setEmail(text)
            setError('');
        }
    }

    const onProcessSignUp = () => {
        const user = {
            full_name: name,
            username: email,
            password: password,
            role: "user"
        };
        console.log(user);
        axios.post(`http://172.20.10.2:5000/register`,  {user} )
            .then(res => {
                setMessage(res.data.message);
            })
    }

    // search start (24 horizontal padding )
    const searchStart = device.width - 48;
    const searchEnd = device.width - 88;

    const opacity = scrollY.interpolate({
        inputRange: [0, 48],
        outputRange: [searchStart, searchEnd],
        extrapolate: 'clamp'
    });

    return (
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

                <Text style={styles.sectionHeading}>Sign up</Text>
                <View style={styles.containerRow}>
                    <Image source={images['logo']} style={styles.image} />
                    <Text style={styles.message}>{message}</Text>

                    <TextInput name="name" style={styles.input} placeholder="Name" placeholderTextColor="#FFF" value={name}  onChangeText={(value) => setName(value)}></TextInput>
                    <TextInput name="email" style={styles.input} placeholder="Email" placeholderTextColor="#FFF" onChangeText={(text) => validateEmail(text)} value={email}></TextInput>
                    <Text style={styles.error}>{error}</Text>
                    <TextInput secureTextEntry={true} name="password" style={styles.input} placeholder="Password" placeholderTextColor="#FFF" value={password} onChangeText={(value) => setPassword(value)}></TextInput>

                    <View style={styles.loginButton}>
                        <Pressable style={styles.loginText} onPress={() => onProcessSignUp()}>
                            <Text style={styles.textLogin}>SIGN UP</Text>
                        </Pressable>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.textNotAcc}>Already have an account?</Text>
                        <Pressable style={styles.loginText} onPress={() => navigation.navigate('ModalLogIn')}>
                            <Text style={styles.signUpText}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </Animated.ScrollView>

        </React.Fragment>
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
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    containerColumn: {
        width: '50%'
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 35,

    },
    input: {
        width: "80%",
        height: 50,
        borderRadius: 5,
        borderColor: "white",
        color: "white",
        borderWidth: 1,
        padding: 12,
        marginTop: 12,
        marginRight: '10%',
        marginLeft: '10%'
    },
    textLogin: {
        color: colors.white,
        fontWeight: "600"
    },
    forgotText: {
        marginTop: 10,
        marginLeft: 160,
        color: colors.white,
    },
    loginButton: {
        backgroundColor: colors.brandPrimary,
        height: 50,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginTop: 25,
        marginRight: '10%',
        marginLeft: '10%'
    },
    loginText: {
        color: colors.white,
        fontWeight: "600",
    },
    footer: {
        alignItems: 'center',
        marginTop: 25,
        marginRight: '10%',
        marginLeft: '10%',

    },
    textNotAcc: {
        color: colors.white,
        marginRight: 5
    },
    signUpText: {
        color: colors.brandPrimary,
        fontWeight: "600",
    },
    error: {
        color: 'red',
        marginRight: '10%',
        marginLeft: '10%',
    },
    message: {
        color: 'green',
        marginRight: '10%',
        marginLeft: '10%',
    }
});

export default ModalLgout;
