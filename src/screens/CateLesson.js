import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Animated,
  Image,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { colors, device, gStyle, images } from '../constants';

// components
import LinearGradient from '../components/LinearGradient';
import LineItemEnglish from '../components/LineItemEnglish';
import TouchIcon from '../components/TouchIcon';

// mock data
import cateLessons from '../mockdata/cateLessons';

// context
import Context from '../context';

const CateLesson = ({ navigation, route }) => {
  const { title } = route.params;

  // get main app state
  const { currentLessonData, showLessonBar, updateState } =
    React.useContext(Context);
    
  // local state
  const [downloaded, setDownloaded] = React.useState(false);
  const [lesson, setLesson] = React.useState(currentLessonData.title);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  // ui state
  const cateLesson = cateLessons[title] || null;

  const onToggleDownloaded = (val) => {
    // if web
    if (device.web) {
      setDownloaded(val);

      return;
    }

    // remove downloads alert
    if (val === false) {
      Alert.alert(
        'Remove from Downloads?',
        "You won't be able to play this offline.",
        [
          { text: 'Cancel' },
          {
            onPress: () => {
              setDownloaded(false);
            },
            text: 'Remove'
          }
        ],
        { cancelable: false }
      );
    } else {
      setDownloaded(val);
    }
  };

  const onChangeLesson = (lessonData) => {
    // update local state
    setLesson(lessonData.title);

    // update main state
    updateState('currentLessonData', lessonData);
    navigation.navigate('ModalLessonPlayer')
  };

  // cateLesson data not set?
  if (cateLesson === null) {
    return (
      <View style={[gStyle.container, gStyle.flexCenter]}>
        <Text style={{ color: colors.white }}>{`CateLesson: ${title}`}</Text>
      </View>
    );
  }

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

  return (
    <View style={gStyle.container}>
      {showLessonBar === false && (
        <BlurView intensity={99} style={styles.blurview} tint="dark" />
      )}

      <View style={styles.containerHeader}>
        <Animated.View
          style={[styles.headerLinear, { opacity: opacityHeading }]}
        >
          <LinearGradient fill={cateLesson.backgroundColor} height={89} />
        </Animated.View>
        <View style={styles.header}>
          <TouchIcon
            icon={<Feather color={colors.white} name="chevron-left" />}
            onPress={() => navigation.goBack(null)}
          />
          <Animated.View style={{ opacity: opacityShuffle }}>
            <Text style={styles.headerTitle}>{cateLesson.title}</Text>
          </Animated.View>
          <TouchIcon
            icon={<Feather color={colors.white} name="more-horizontal" />}
            onPress={() => {
              // update main state
              updateState('showLessonBar', !showLessonBar);

              navigation.navigate('ModalMoreOptions', {
                cateLesson
              });
            }}
          />
        </View>
      </View>

      <View style={styles.containerFixed}>
        <View style={styles.containerLinear}>
          <LinearGradient fill={cateLesson.backgroundColor} />
        </View>
        <View style={styles.containerImage}>
          <Image source={images[cateLesson.image]} style={styles.image} />
        </View>
        <View style={styles.containerTitle}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
            {cateLesson.title}
          </Text>
        </View>
        <View style={styles.containerCateLesson}>
          <Text style={styles.cateLessonInfo}>
            {`CateLesson by ${cateLesson.author} · ${cateLesson.released}`}
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
          <View style={styles.row}>
            <Text style={styles.downloadText}>
              {downloaded ? 'Downloaded' : 'Download'}
            </Text>
            <Switch
              trackColor={colors.greySwitchBorder}
              onValueChange={(val) => onToggleDownloaded(val)}
              value={downloaded}
            />
          </View>

          {cateLesson.tracks &&
            cateLesson.tracks.map((track) => (
              <LineItemEnglish
                active={lesson === track.title}
                downloaded={downloaded}
                key={track.title}
                onPress={onChangeLesson}
                lessonData={{
                  cateLesson: cateLesson.title,
                  author: cateLesson.author,
                  image: cateLesson.image,
                  length: track.seconds,
                  title: track.title,
                  content: track.content,
                  id: track.id,
                  data: track
                }}
              />
            ))}
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
    height: 89,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 100
  },
  headerLinear: {
    height: 89,
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
    height: 148,
    marginBottom: device.web ? 0 : 16,
    width: 148
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
    paddingTop: 89
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
    borderRadius: 25,
    height: 50,
    width: 220
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
  }
});

export default CateLesson;
