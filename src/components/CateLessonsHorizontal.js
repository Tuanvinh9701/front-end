import * as React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, gStyle, images } from '../constants';
import axios from 'axios';
import { createAPIEndpoint, BASE_URL } from '../api'

// context
import Context from '../context';



const CateLessonsHorizontal = ({ data, heading, tagline }) => {
  const navigation = useNavigation();
  // get main app state
  const { showLessonBar, updateState } = React.useContext(Context);

  const onPressJoinBook = (item) => {
    updateState('showLessonBar', !showLessonBar);
    const bookUser = {
      user_id: 1,
      book_title: item.title,
    };
    axios.post(BASE_URL + `add_book_with_user`,  {bookUser} )
      .then(res => {
        console.log(res.data.status);
      })
    navigation.navigate('CateLesson', { title: item.title })
  };

  return (
    <View style={styles.container}>
      {heading && <Text style={styles.heading}>{heading}</Text>}
      {tagline && <Text style={styles.tagline}>{tagline}</Text>}

      <FlatList
        contentContainerStyle={styles.containerContent}
        data={data}
        horizontal
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={gStyle.activeOpacity}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            onPress={() => onPressJoinBook(item)}
            style={styles.item}
          >
            <View style={styles.image}>
              {item.image && (
                <Image source={images[item.image]} style={styles.image} />
              )}
            </View>
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

CateLessonsHorizontal.defaultProps = {
  heading: null,
  tagline: null
};

CateLessonsHorizontal.propTypes = {
  // required
  data: PropTypes.array.isRequired,

  // optional
  heading: PropTypes.string,
  tagline: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    width: '100%'
  },
  containerContent: {
    paddingLeft: 16
  },
  heading: {
    ...gStyle.textGroup7Bold18,
    color: colors.white,
    paddingBottom: 6,
    textAlign: 'center'
  },
  tagline: {
    ...gStyle.textGroup712,
    color: colors.greyInactive,
    paddingBottom: 6,
    textAlign: 'center'
  },
  item: {
    marginRight: 16,
    width: 148
  },
  image: {
    backgroundColor: colors.greyLight,
    height: 148,
    width: 148
  },
  title: {
    ...gStyle.textGroup7Bold12,
    color: colors.white,
    marginTop: 4,
    textAlign: 'center'
  }
});

export default CateLessonsHorizontal;
