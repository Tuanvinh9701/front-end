import * as React from 'react';
import PropTypes from 'prop-types';
// icons
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../constants';

const IconsTabLesson = ({ active, size }) => {
  const fill = active ? colors.white : colors.greyInactive;

  return (
    <Ionicons name={"menu"} size={size} color={fill} />
  );
};
IconsTabLesson.defaultProps = {
  active: false,
  size: 24
};

IconsTabLesson.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};

export default IconsTabLesson;
