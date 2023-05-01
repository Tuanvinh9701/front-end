import * as React from 'react';
import { Animated, StyleSheet, View, Text, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, device, gStyle } from '../constants';
import { createAPIEndpoint, BASE_URL } from '../api'
import { useNavigation } from '@react-navigation/native';
import Context from '../context';

// components
import CateLessonsHorizontal from '../components/CateLessonsHorizontal';

const Home = () => {
  const [bestSeller, setBestSeller] = React.useState([]);
  const [recentlyLesson, setrecentlyLesson] = React.useState([]);
  const [jumpBackIn, setJumpBackIn] = React.useState([]);
  const [vocabs, setVocabs] = React.useState([]);
  const {user_id} = React.useContext(Context);
  // // console.log(typeof bestSeller);
  React.useEffect(() => {
    createAPIEndpoint('get_best_favorite')
    .fetch() 
    .then(res => {
      setBestSeller(res.data);
    })
    createAPIEndpoint('get_recently_books')
    .fetch()
    .then(res => {
      setrecentlyLesson(res.data);
    })
    createAPIEndpoint('get_jump_BackIn')
    .fetch()
    .then(res => {
      setJumpBackIn(res.data);
    })
    createAPIEndpoint('get_all_vocabs_of_user')
    .fetchById(user_id)
    .then(res => {
      setVocabs(res.data);
    })
  }, [])
  // console.log(bestSeller);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  const opacityIn = scrollY.interpolate({
    inputRange: [0, 128],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const opacityOut = scrollY.interpolate({
    inputRange: [0, 88],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  return (
    
    <React.Fragment>
      {device.iPhoneNotch && (
        <Animated.View style={[styles.iPhoneNotch, { opacity: opacityIn }]} />
      )}

      {/* <Animated.View style={[styles.containerHeader, { opacity: opacityOut }]}>
        <FontAwesome color={colors.white} name="cog" size={28} />
      </Animated.View> */}

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={gStyle.container}
      >
        <View style={gStyle.spacer16} />
        <Pressable style={styles.vocabView} onPress={() => navigation.navigate('HomeLearnVocab')}>
          <View>
            <Text style={styles.textLarge}>My vocabs</Text>
            <Text style={styles.textSmall}>0/{vocabs.length} Learned vocabulary</Text>
            <View style={styles.line}></View>
          </View>
        </Pressable>
        <View style={gStyle.spacer6} />
        <CateLessonsHorizontal data={recentlyLesson} heading="Recent lessons" />

        <CateLessonsHorizontal
          data={bestSeller}
          heading="Popular books"
          tagline="The most searched books on the site"
        />

        <CateLessonsHorizontal
          data={jumpBackIn}
          heading="New lessons updated"
          tagline="New books updated on the website"
        />
      </Animated.ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  iPhoneNotch: {
    backgroundColor: colors.black70,
    height: 44,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 20
  },
  containerHeader: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: device.iPhoneNotch ? 60 : 36,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10
  },
  vocabView: {
    height: 150,
    width: '90%',
    backgroundColor: colors.greyOff,
    borderRadius: 10,
    marginHorizontal: '5%',
    borderWidth: 1,
    borderColor: colors.white,
    paddingTop: 30,
    paddingLeft: 20,
  }, 
  textLarge: {
    fontSize: 20,
    color: colors.white,
  },
  textSmall: {
    fontSize: 15,
    marginTop: 30,
    color: colors.greyLight,
  },
  line: {
    height: 10,
    width: '92%',
    backgroundColor: colors.greyLight,
    borderRadius: 10,
    marginTop: 10,
  }
});

export default Home;
