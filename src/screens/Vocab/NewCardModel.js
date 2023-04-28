import React from 'react';
import {
    StyleSheet,
    Text,
    Modal,
    View,
    TextInput,
    TouchableHighlight
} from 'react-native';


export default class NewCardModal extends React.Component {
    state = {
        newTermInput: '',
        newDefinitionInput: '',
        newSubjectInput: ''
    }


    render() {
        return (
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.props.modalVisible}
            >
                <View style={styles.newCardModal}>
                    <TouchableHighlight
                        onPress={this.props.toggleModal}
                        underlayColor='transparent'
                        style={styles.closeButton}
                    >
                        <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableHighlight>


                    <TextInput
                        placeholder='New Term'
                        style={styles.newTermInput}
                        value={this.state.newTermInput}
                        onChangeText={(text) => {
                            this.setState({
                                newTermInput: text
                            });
                        }}
                    />
                    <TextInput
                        placeholder='Subject'
                        style={styles.newTermInput}
                        value={this.state.newSubjectInput}
                        onChangeText={(text) => {
                            this.setState({
                                newSubjectInput: text
                            });
                        }}
                    />


                    <TextInput
                        placeholder='New Definition'
                        style={styles.newDefinitionInput}
                        value={this.state.newDefinitionInput}
                        multiline={true}
                        onChangeText={(text) => {
                            this.setState({
                                newDefinitionInput: text
                            });
                        }}
                    />

                    <TouchableHighlight
                        style={styles.addCardButton}
                        underlayColor='#19358A'
                        onPress={() => {
                            const {newTermInput, newDefinitionInput, newSubjectInput} = this.state;
                            this.props.addCard(newTermInput, newDefinitionInput, newSubjectInput);


                            // Reset inputs
                            this.setState({
                                newTermInput: '',
                                newDefinitionInput: '',
                                newSubjectInput: ''
                            })
                        }}
                    >
                        <Text style={styles.addCardButtonText}>Add Card</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    newCardModal: {
        flex: 1,
        backgroundColor: '#007aff',
        justifyContent: 'center',
        alignContent: 'center'
    },
    newTermInput: {
        backgroundColor: '#ffffff',
        borderColor: '#F2F2F2',
        borderWidth: 1,
        padding: 15,
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 18
    },
    newDefinitionInput: {
        backgroundColor: '#ffffff',
        borderColor: '#F2F2F2',
        borderWidth: 1,
        padding: 15,
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 18,
        height: 120
    },
    closeButton: {
        position: 'absolute',
        top: 30,
        right: 15,
        backgroundColor: 'transparent',
        justifyContent: 'center'
    },
    closeButtonText: {
        textAlign: 'center',
        fontSize: 40,
        color: '#FFFFFF'
    },
    addCardButton: {
        backgroundColor: '#2042a6',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        padding: 20
    },
    addCardButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center'
    }
});