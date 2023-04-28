import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Pressable,
  Animated,
  Image,
  StyleSheet,
  TextInput,
  Text,
  View
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, device, gStyle, images } from '../../constants';

// components
import LinearGradient from '../../components/LinearGradient';
import TouchIcon from '../../components/TouchIcon';
import { createAPIEndpoint, BASE_URL } from '../../api'
// context
import Context from '../../context';
import axios from 'axios';

const CateLesson = ({ navigation }) => {
  const [user, setUser] = React.useState([]);

  // get main app state
  const { user_id } =
    React.useContext(Context);
  console.log(user_id)

  React.useEffect(() => {
        createAPIEndpoint('get_user_id')
        .fetchById(user_id) 
        .then(res => {
            setUser(res.data);
        })
        .catch(err => { console.log(err); })
  }, [])

  console.log(user);

  const [email, setEmail] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [message, setMessage] = React.useState('');

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const stickyArray = device.web ? [] : [0];
  const headingRange = device.web ? [140, 200] : [230, 280];
  const shuffleRange = device.web ? [40, 80] : [40, 80];

  const opacityHeading = scrollY.interpolate({
    inputRange: headingRange,
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const opacityShuffle = scrollY.interpolate({
    inputRange: shuffleRange,
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setMessage("Invalid Email");
      setEmail(text)
      return false;
    }
    else {
      setEmail(text)
      setMessage('');
    }
  }
  
  const onUpdateUser = () => {
    if (email == '' || fullName == '') {
      setMessage('Please complete all information');
    } else {
      const user = {
        username: email,
        full_name: fullName,
        id: user_id
      };
      console.log(user);
      axios.post(BASE_URL + `update_user_id`,  {user} )
        .then(res => {
          setMessage('Update information successfully');
        })
    }
  }
  return (
    
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <Animated.View
          style={[styles.headerLinear, { opacity: opacityHeading }]}
        >
          <LinearGradient fill={"white"} height={10} />
        </Animated.View>
        <View style={styles.header}>
          <TouchIcon
            icon={<Feather color={colors.white} name="chevron-left" />}
            onPress={() => navigation.goBack(null)}
          />
          <Animated.View style={{ opacity: opacityShuffle }}>
            <Text style={styles.headerTitle}>Update Information</Text>
          </Animated.View>
          <TouchIcon
            icon={<Feather color={colors.white} name="more-horizontal" />}
            onPress={() => {
              
            }}
          />
        </View>
      </View>

      <View style={styles.containerFixed}>
        <View style={styles.containerLinear}>
          <LinearGradient fill={"white"} />
        </View>
        <View style={styles.containerImage}>
          <Image source={images["avt"]} style={styles.image} />
        </View>
        <View style={styles.containerTitle}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
            Update Information
          </Text>
        </View>
        <View style={styles.containerCateLesson}>
          <Text style={styles.cateLessonInfo}>
          Learning English the leading English learning app         
           </Text>
        </View>
      </View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={stickyArray}
        style={styles.containerScroll}
      >
        <View style={styles.containerSticky}>
          <Animated.View
            style={[styles.containerStickyLinear, { opacity: opacityShuffle }]}
          >
            <LinearGradient fill={colors.black20} height={50} />
          </Animated.View>
          
        </View>
        <View style={styles.containerLessons}>
            <View style={styles.container}>
                <View style={gStyle.flexRow}>
                    <Text style={styles.title_label}>Hello: </Text>
                    <Text style={styles.title_content}>{user['full_name']}</Text>
                </View>
            </View>
            <View style={gStyle.flexRow}>
              <Text style={styles.message}>{message}</Text>
            </View>
            <View style={styles.container}>
              
                <View style={gStyle.flex1}>
                    <Text style={styles.title_content}>User name</Text>
                    <TextInput style={styles.input} placeholder={user['full_name']} placeholderTextColor="#FFF"  onChangeText={(value) => setFullName(value)}></TextInput>
                </View>
            </View>
            <View style={styles.container}>
                <View style={gStyle.flex1}>
                    <Text style={styles.title_content}>User email</Text>
                    <TextInput style={styles.input} placeholder={user['username']} placeholderTextColor="#FFF"  onChangeText={(value) => validateEmail(value)}></TextInput>
                </View>
            </View>
            {/* <View style={styles.container}>
                <View style={gStyle.flex1}>
                    <Text style={styles.title_content}>Mật khẩu</Text>
                    <TextInput secureTextEntry={true} style={styles.input} value="vttruong@go.olemiss.edu" placeholderTextColor="#b6b6b6" ></TextInput>
                </View>
            </View> */}
            <View style={styles.container}>
                <Pressable style={styles.btn} onPress={() => onUpdateUser()}>
                <Text style={styles.btnText}>Update</Text>
                </Pressable>
            </View>
        </View>
        <View style={gStyle.spacer16} />
      </Animated.ScrollView>
    </View>
  );
};

CateLesson.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  blurview: {
    ...StyleSheet.absoluteFill,
    zIndex: 101
  },
  containerHeader: {
    height: 10,
    position: 'absolute',
    top: 30,
    width: '100%',
    zIndex: 100
  },
  headerLinear: {
    height: 10,
    width: '100%'
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: device.iPhoneNotch ? 48 : 24,
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  headerTitle: {
    ...gStyle.textGroup7Bold16,
    color: colors.white,
    marginTop: 2,
    paddingHorizontal: 8,
    textAlign: 'center',
    width: device.width - 100
  },
  containerFixed: {
    alignItems: 'center',
    paddingTop: device.iPhoneNotch ? 94 : 60,
    position: 'absolute',
    width: '100%'
  },
  containerLinear: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: device.web ? 5 : 0
  },
  containerImage: {
    shadowColor: colors.black,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    zIndex: device.web ? 20 : 0
  },
  image: {
    height: 80,
    width: 250
  },
  containerTitle: {
    marginTop: device.web ? 8 : 0,
    zIndex: device.web ? 20 : 0
  },
  title: {
    ...gStyle.textGroup7Bold20,
    color: colors.white,
    marginBottom: 8,
    paddingHorizontal: 24,
    textAlign: 'center'
  },
  containerCateLesson: {
    zIndex: device.web ? 20 : 0
  },
  cateLessonInfo: {
    ...gStyle.textGroup712,
    color: colors.greyInactive,
    marginBottom: 48
  },
  containerScroll: {
    paddingTop: 10
  },
  containerSticky: {
    marginTop: device.iPhoneNotch ? 238 : 194
  },
  containerStickyLinear: {
    position: 'absolute',
    top: 0,
    width: '100%'
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
    textTransform: 'uppercase'
  },
  containerLessons: {
    alignItems: 'center',
    backgroundColor: colors.blackBg,
    minHeight: 540
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    width: '100%'
  },
  downloadText: {
    ...gStyle.textGroup7Bold18,
    color: colors.white
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
  message: {
    color: "green",
  }
});

export default CateLesson;
