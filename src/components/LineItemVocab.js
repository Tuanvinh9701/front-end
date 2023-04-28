import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import {
    Feather
  } from '@expo/vector-icons';
import { colors, gStyle , images} from '../constants';

const onPressAlert = (es, vi) => {
    Alert.alert(es, "It's mean: " + vi);
}

const LineItemVocab = ({
    vi,
    es,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={gStyle.activeOpacity}
            onPress={() => onPressAlert(es, vi)}
            style={styles.container}
        >
            <View style={gStyle.flexRowCenterAlign}>
                <Text style={styles.title}>{es}</Text>
            </View>
            <View style={styles.containerRight}>
                <Feather color={colors.greyInactive} name="chevron-right" size={20} />
            </View>

        </TouchableOpacity>
    );
};

LineItemVocab.propTypes = {
    // required
    es: PropTypes.string.isRequired,
    vi: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        width: '100%'
    },
    title: {
        ...gStyle.textGroup714,
        color: colors.white,
    },
    containerRight: {
        alignItems: 'flex-end',
        flex: 1
    }
});

export default LineItemVocab;
