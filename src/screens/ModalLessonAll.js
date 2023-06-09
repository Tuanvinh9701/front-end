import * as React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { colors, device, func, gStyle, images } from '../constants';

// components
import ModalHeader from '../components/ModalHeader';
import TouchIcon from '../components/TouchIcon';

// context
import Context from '../context';

const ModelLessionAll = (props) => {
  // get main app state
  const { currentLessonData } = React.useContext(Context);

  // local state
  const [favorited, setFavorited] = React.useState(false);
  const [paused, setPaused] = React.useState(true);

  const { navigation } = props;

  // ui state
  const favoriteColor = favorited ? colors.brandPrimary : colors.white;
  const favoriteIcon = favorited ? 'heart' : 'heart-o';
  const iconPlay = paused ? 'play-circle' : 'pause-circle';
  const timePast = func.formatTime(0);
  const timeLeft = func.formatTime(currentLessonData.length);

  return (
    <View style={gStyle.container}>
      <ModalHeader
        left={<Feather color={colors.greyLight} name="chevron-down" />}
        leftPress={() => navigation.goBack(null)}
        right={<Feather color={colors.greyLight} name="more-horizontal" />}
        text={currentLessonData.cateLesson}
      />

      <View style={gStyle.p3}>
        <Image source={images[currentLessonData.image]} style={styles.image} />

        <View style={[gStyle.flexRowSpace, styles.containerDetails]}>
          <View style={styles.containerLesson}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.lesson}>
              {currentLessonData.title}
            </Text>
            <Text style={styles.author}>{currentLessonData.author}</Text>
          </View>
          <View style={styles.containerFavorite}>
            <TouchIcon
              icon={<FontAwesome color={favoriteColor} name={favoriteIcon} />}
              onPress={() => setFavorited(!favorited)}
            />
          </View>
        </View>

        <View style={styles.containerVolume}>
          <Slider
            minimumValue={0}
            maximumValue={currentLessonData.length}
            minimumTrackTintColor={colors.white}
            maximumTrackTintColor={colors.grey3}
          />
          <View style={styles.containerTime}>
            <Text style={styles.time}>{timePast}</Text>
            <Text style={styles.time}>{`-${timeLeft}`}</Text>
          </View>
        </View>

        <View style={styles.containerControls}>
          <TouchIcon
            icon={<Feather color={colors.greyLight} name="shuffle" />}
            onPress={() => null}
          />
          <View style={gStyle.flexRowCenterAlign}>
            <TouchIcon
              icon={<FontAwesome color={colors.white} name="step-backward" />}
              iconSize={32}
              onPress={() => null}
            />
            <View style={gStyle.pH3}>
              <TouchIcon
                icon={<FontAwesome color={colors.white} name={iconPlay} />}
                iconSize={64}
                onPress={() => setPaused(!paused)}
              />
            </View>
            <TouchIcon
              icon={<FontAwesome color={colors.white} name="step-forward" />}
              iconSize={32}
              onPress={() => null}
            />
          </View>
          <TouchIcon
            icon={<Feather color={colors.greyLight} name="repeat" />}
            onPress={() => null}
          />
        </View>

        <View style={styles.containerBottom}>
          <TouchIcon
            icon={<Feather color={colors.greyLight} name="speaker" />}
            onPress={() => null}
          />
          <TouchIcon
            icon={
              <MaterialIcons color={colors.greyLight} name="playlist-play" />
            }
            onPress={() => null}
          />
        </View>
      </View>
    </View>
  );
};

ModelLessionAll.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  image: {
    height: device.width - 48,
    marginVertical: device.iPhoneNotch ? 36 : 8,
    width: device.width - 48
  },
  containerDetails: {
    marginBottom: 16
  },
  containerLesson: {
    flex: 6
  },
  lesson: {
    ...gStyle.textGroup7Bold24,
    color: colors.white
  },
  author: {
    ...gStyle.textGroup718,
    color: colors.greyInactive
  },
  containerFavorite: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center'
  },
  containerTime: {
    ...gStyle.flexRowSpace
  },
  time: {
    ...gStyle.textGroup710,
    color: colors.greyInactive
  },
  containerControls: {
    ...gStyle.flexRowSpace,
    marginTop: device.iPhoneNotch ? 24 : 8
  },
  containerBottom: {
    ...gStyle.flexRowSpace,
    marginTop: device.iPhoneNotch ? 32 : 8
  }
});

export default ModelLessionAll;
