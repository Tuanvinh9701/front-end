import * as React from 'react';
import PropTypes from 'prop-types';
// icons
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../constants';

const IconsTabNews = ({ active, size }) => {
  const fill = active ? colors.white : colors.greyInactive;

  return (
    <Ionicons name={"today"} size={size} color={fill} />
  );
};
IconsTabNews.defaultProps = {
  active: false,
  size: 24
};

IconsTabNews.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};

export default IconsTabNews;
