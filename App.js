import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import Item from './app/components/Item';
import ImagePicker from 'react-native-image-picker'
import RNFS from 'react-native-fs'

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      id: '',
      itemArray: [],
      itemText: '',
      avatarSource: {}
    };
    this.selectImage = this.selectImage.bind(this);
    this.saveChangedItem = this.saveChangedItem.bind(this);
  }

  componentWillMount () {
    const jsonPath = RNFS.DocumentDirectoryPath + '/list.json';
    if (RNFS.exists(jsonPath)) {
      RNFS.readFile(jsonPath)
        .then((data) => {
          this.setState({
            itemArray: data ? JSON.parse(data) : []
          })
        })
    } else {
      this.storageFunc([]);
    }
  }

  storageFunc(data) {
    const jsonPath = RNFS.DocumentDirectoryPath + '/list.json';
    RNFS.writeFile(jsonPath, JSON.stringify(data));
    this.setState({
      itemArray: data
    })
  }

  addItem() {
    if (this.state.itemText) {
      var itemDate = new Date();
      this.state.itemArray.push( {
        'date': itemDate.getFullYear() + '/'
        + (itemDate.getMonth() + 1) + '/'
        + itemDate.getDate(),
        'description': this.state.itemText,
        'url': this.state.avatarSource
      });
      this.storageFunc(this.state.itemArray);
      this.setState({
        itemArray: this.state.itemArray,
        itemText: '',
        avatarSource: {}
      });
    }
  }

  deleteItem(key) {
    var list = this.state.itemArray;
    list.splice(key, 1);
    this.setState({ itemArray: list});
    this.storageFunc(list);
  }

  selectImage () {
    let options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        let filePath = RNFS.DocumentDirectoryPath + '/test-image.jpeg';
        console.log('response', response);
        RNFS.writeFile(filePath, response.data, 'base64')
          .then(() => {
            console.log('saved file', filePath)
          })
          .catch(err => {
            console.log('error save file', err)
          });
        this.setState({
          avatarSource: { uri: response.uri }
          // avatarSource: { uri: 'file://' + filePath }
        }, () => { console.log('avatar', this.state.avatarSource) })
      }
    })
  }

  editItem(key) {
    var list = this.state.itemArray;
    list[key].isEdit = true;
    this.setState({ itemArray: list});
    this.storageFunc(list);
  }

  saveChangedItem(key) {
    this.state.itemArray[key]['isEdit'] = false;
    this.storageFunc(this.state.itemArray);
    this.setState({
      itemArray: this.state.itemArray
    });
  }
  render() {
    let items = this.state.itemArray.map((val, key) => {
      return <Item key={key} keyval={key} val={val}
                   editItemMethod={() => this.editItem(key)}
                   deleteItemMethod={() => this.deleteItem(key)}
                   saveItemMethod={() => this.saveChangedItem(key)}
      />
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>TODO List</Text>
        </View>
        <TouchableOpacity
          style={styles.photoButton}
          onPress={this.selectImage}>
          <Text style={styles.photoButtonText}>
            Upload image
          </Text>
        </TouchableOpacity>
        <View>
          <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
        </View>
        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            placeholder='Add Item'
            onChangeText={(itemText) =>
              this.setState({itemText})
            }
            value={this.state.itemText}
          />
          <TouchableOpacity onPress={this.addItem.bind(this)} style={styles.addItem}>
            <Text style={styles.addItemText}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollWrapper}>
          {items}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: 'teal',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 20,
    padding: 20,
    color: 'white',
  },
  scrollWrapper: {
    padding: 5,
  },
  footer: {
    padding: 5,
    height: 50,
    flexDirection: 'row'
  },
  textInput: {
    width: 340,
    height: 40,
  },
  addItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 40,
    backgroundColor: 'teal',
    borderRadius: 10,
  },
  addItemText: {
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  photoButton: {
    flex: 0,
    padding: 20,
    marginBottom: 10,
    backgroundColor: 'grey',
    justifyContent: 'center'
  },
  photoButtonText: {
    color: 'blue',
    textAlign: 'center'
  },
  uploadAvatar: {
    width: 50,
    height: 50,
    backgroundColor: 'white'
  }
});