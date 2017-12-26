import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default class Item extends React.Component {
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
          <View>
            <Text style={styles.dateText}>{this.props.val.date}</Text>
            <Text style={styles.itemDescription}>{this.props.val.description}</Text>
          </View>
          <TouchableOpacity onPress={this.props.deleteItemMethod}>
            <Text style={styles.deleteText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: 'white'
  },
  information: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  deleteText: {
    padding: 10,
    color: 'white',
    backgroundColor: 'teal',
    borderRadius: 8,
  }
});