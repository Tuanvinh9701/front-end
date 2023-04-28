import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, gStyle } from '../constants';

const LineItemLesson = ({ active, downloaded, onPress, lessonData }) => {
  const activeColor = active ? colors.brandPrimary : colors.white;

  return (
  <TouchableOpacity
    activeOpacity={gStyle.activeOpacity}
    onPress={() => onPress(lessonData)}
    style={styles.container}
    >
    <View style={gStyle.flex5}>
        <Text style={[styles.title, { color: activeColor }]}>
          {lessonData.title}
        </Text>
        <View style={gStyle.flexRow}>
          {downloaded && (
            <View style={styles.circleDownloaded}>
              <Ionicons color={colors.blackBg} name="arrow-down" size={14} />
            </View>
          )}
          <Text style={styles.author}>{lessonData.author}</Text>
        </View>
    </View>
      </TouchableOpacity>
  );
};

LineItemLesson.defaultProps = {
  active: false,
  downloaded: false
};

LineItemLesson.propTypes = {
  // required
  onPress: PropTypes.func.isRequired,
  lessonData: PropTypes.shape({
    cateLesson: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,

  // optional
  active: PropTypes.bool,
  downloaded: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    width: '92%',
    marginBottom: 8,
    borderColor: colors.greyOff,
    borderWidth: 1,
    borderRadius: 20
  },
  title: {
    ...gStyle.textGroup716,
    color: colors.white,
    marginBottom: 4
  },
  circleDownloaded: {
    alignItems: 'center',
    backgroundColor: colors.brandPrimary,
    borderRadius: 7,
    height: 14,
    justifyContent: 'center',
    marginRight: 8,
    width: 14
  },
  author: {
    ...gStyle.textGroup712,
    color: colors.greyInactive
  },
  containerRight: {
    alignItems: 'flex-end',
    flex: 1
  }
});

export default LineItemLesson;
