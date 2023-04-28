import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../constants';

const IconsTabSearch = ({ active, size }) => {
  const fill = active ? colors.white : colors.greyInactive;
  return (
    <Ionicons name={"book"} size={size} color={fill} />
  );
};

IconsTabSearch.defaultProps = {
  active: false,
  size: 24
};

IconsTabSearch.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};

export default IconsTabSearch;
