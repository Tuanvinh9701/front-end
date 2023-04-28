import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../constants';

const IconsTabPerson = ({ active, size }) => {
  const fill = active ? colors.white : colors.greyInactive;

  return (
    <Ionicons name={"person"} size={size} color={fill} />
  );
};

IconsTabPerson.defaultProps = {
  active: false,
  size: 24
};

IconsTabPerson.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};

export default IconsTabPerson;
