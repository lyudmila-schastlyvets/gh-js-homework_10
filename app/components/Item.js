import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';

export default class Item extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
     test: ''
    };
  }

  render() {

    return (
      <View key={this.props.keyval} style={styles.item}>
        {this.props.val.url ?
          <Image
            style={styles.image}
            source={this.props.val.url}
          /> : null
        }
        <View style={styles.information}>
          <View style={styles.infoText}>
            <Text style={styles.dateText}>{this.props.val.date}</Text>
            {this.props.val.isEdit ?
              <TextInput
                style={styles.input}
                defaultValue={this.props.val.description}
                onChangeText={(desc) => this.props.val.description = desc}
              ></TextInput> : <Text style={styles.itemDescription}>{this.props.val.description}</Text>}
          </View>
          <View style={styles.buttonsBox}>
            {this.props.val.isEdit ?
              <TouchableOpacity onPress={this.props.saveItemMethod}>
                <Text style={styles.deleteText}>Save</Text>
              </TouchableOpacity> :
              <TouchableOpacity onPress={this.props.editItemMethod}>
              <Text style={styles.deleteText}>Edit</Text>
            </TouchableOpacity>
            }
            <TouchableOpacity onPress={this.props.deleteItemMethod}>
              <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    minHeight: 80,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    maxWidth: 250,
  },
  image: {
    flex: 1,
    width: 50,
    height: 50,
    backgroundColor: 'white'
  },
  information: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  buttonsBox: {
    flexDirection: 'row',
  },
  deleteText: {
    marginLeft: 5,
    padding: 10,
    color: 'white',
    backgroundColor: 'teal',
    borderRadius: 8,
  }
});