import * as React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { createAPIEndpoint, BASE_URL } from '../api'
import { colors, device, gStyle } from '../constants';
import { useNavigation } from '@react-navigation/native';
// components
import PlaylistItem from '../components/PlaylistItem';

// icons
import SvgSearch from '../icons/Icons.Search';
import { TextInput } from 'react-native';

const Book = () => {
  const [topGenres, setTopGenres] = React.useState([]);
  React.useEffect(() => {
    createAPIEndpoint('get_all_cate_books')
        .fetch()
        .then(res => {
          setTopGenres(res.data);
        })
        .catch(err => { console.log(err); })
  }, [])


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
            {/* <Animated.View style={{ width: opacity }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => null}
              style={styles.searchPlaceholder}
            >
              <View style={gStyle.mR1}>
                <SvgSearch />
              </View>
              <TextInput style={styles.searchPlaceholderText}>
                Search
              </TextInput>
            </TouchableOpacity>
          </Animated.View> */}
          </View>

          <Text style={styles.sectionHeading}>Book category</Text>
          <View style={styles.containerRow}>
            {Object.keys(topGenres).map((index) => {
              const item = topGenres[index];

              return (
                  <View key={item.id} style={styles.containerColumn}>
                    <PlaylistItem
                        bgColor={item.color}
                        onPress={() => navigation.navigate('ListBook', { id: item.id })}
                        title={item.title}
                    />
                  </View>
              );
            })}
          </View>
        </Animated.ScrollView>

        {/* <View style={styles.iconRight}>
        <TouchIcon
          icon={<FontAwesome color={colors.white} name="microphone" />}
          onPress={() => null}
        />
      </View> */}
      </React.Fragment>
  );
};

const styles = StyleSheet.create({
  containerSearchBar: {
    ...gStyle.pH3,
    backgroundColor: colors.blackBg,
    paddingBottom: 16,
    paddingTop: device.iPhoneNotch ? 64 : 24
  },
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
    marginBottom: 24,
    marginLeft: 24,
    marginTop: 16
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 24
  },
  containerColumn: {
    width: '50%'
  },
  iconRight: {
    alignItems: 'center',
    height: 28,
    justifyContent: 'center',
    position: 'absolute',
    right: 24,
    top: device.web ? 40 : 78,
    width: 28
  }
});

export default Book;
