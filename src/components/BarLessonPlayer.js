import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, device, gStyle } from '../constants';
import { Audio } from "expo-av";
// context
import Context from '../context';

const BarLessonPlayer = ({ lesson }) => {
  const navigation = useNavigation();
  const { showLessonBar, updateState } = React.useContext(Context);

  // local state
  const [favorited, setFavorited] = React.useState(false);
  const [paused, setPaused] = React.useState(true);

  const favoriteColor = favorited ? colors.brandPrimary : colors.white;
  // const favoriteIcon = favorited ? 'star' : 'star-o';
  const iconPlay = paused ? 'play-circle' : 'pause-circle';
  const [sound, setSound] = React.useState();
  const onOpenListening = async () => {
    setPaused(!paused);
    const { sound } = await Audio.Sound.createAsync(require('../assets/audios/' + 'listenning' + '.mp3'));
    if (paused) {
      // const url = '../assets/audios/' + vocab + '.mp3';
      setSound(sound);
      console.log('Playing Sound');
      await sound.playAsync();
    } else {
      console.log('Stopping Sound');
      setSound(sound);
      await sound.pauseAsync();
    }
    
  };
  React.useEffect(() => {
    return sound
      ? () => {
        console.log("Unloading Sound");
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('ModalLessonPlayer')}
      style={styles.container}
    >
      {/* <TouchableOpacity
        activeOpacity={gStyle.activeOpacity}
        hitSlop={{ bottom: 5, left: 5, right: 5, top: 5 }}
        onPress={() => setFavorited(!favorited)}
        style={styles.containerIcon}
      >
        <FontAwesome color={favoriteColor} name={favoriteIcon} size={20} />
      </TouchableOpacity> */}

      <TouchableOpacity
        activeOpacity={gStyle.activeOpacity}
        hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
        onPress={() => { setFavorited(!favorited); updateState('showLessonBar', !showLessonBar) }}
        style={styles.containerIcon}
      >
        <FontAwesome color={favoriteColor} name={"angle-down"} size={20} />
      </TouchableOpacity>

      {lesson && (
        <View>
          <View style={styles.containerLesson}>
            <Text style={styles.title}>{`${lesson.title} · `}</Text>
            <Text style={styles.author}>{lesson.author}</Text>
          </View>
          <View style={[gStyle.flexRowCenter, gStyle.mTHalf]}>
            <FontAwesome
              color={colors.brandPrimary}
              name="bluetooth-b"
              size={14}
            />
            <Text style={styles.device}>Learning English</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        activeOpacity={gStyle.activeOpacity}
        hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
        onPress={() => onOpenListening()}
        style={styles.containerIcon}
      >
        <FontAwesome color={colors.white} name={iconPlay} size={28} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

BarLessonPlayer.defaultProps = {
  lesson: null
};

BarLessonPlayer.propTypes = {
  // optional
  lesson: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string
  })
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: colors.grey,
    borderBottomColor: colors.blackBg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    width: '100%'
  },
  containerIcon: {
    ...gStyle.flexCenter,
    width: 50
  },
  containerLesson: {
    ...gStyle.flexRowCenter,
    overflow: 'hidden',
    width: device.width - 100
  },
  title: {
    ...gStyle.textGroup712,
    color: colors.white
  },
  author: {
    ...gStyle.textGroup712,
    color: colors.greyLight
  },
  device: {
    ...gStyle.textGroup710,
    color: colors.brandPrimary,
    marginLeft: 4,
    textTransform: 'uppercase'
  }
});

export default BarLessonPlayer;
