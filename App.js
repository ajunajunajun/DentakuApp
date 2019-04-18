import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: ''
    };
  }
  render() {
    var NumButtons789 = [];
    var NumButtons456 = [];
    var NumButtons123 = [];
    for(let i = 1; i < 10 ; i++){
      if(i < 4) {
        NumButtons123.push(
          <TouchableOpacity style={[styles.Button,{backgroundColor: 'snow'}]}
            key={i}
            onPress={ () => this._numSet(i) }
          >
            <Text>{i}</Text>
          </TouchableOpacity>
        );
      } else if(i < 7) {
        NumButtons456.push(
          <TouchableOpacity style={[styles.Button,{backgroundColor: 'snow'}]}
            key={i}
            onPress={ () => this._numSet(i) }
          >
            <Text>{i}</Text>
          </TouchableOpacity>
        );
      } else {
        NumButtons789.push(
          <TouchableOpacity style={[styles.Button,{backgroundColor:'snow'}]}
            key={i}
            onPress={ () => this._numSet(i) }
          >
            <Text>{i}</Text>
          </TouchableOpacity>
        );
      }
    }
    return (
      <View style={styles.container}>
        <View style={{flex:0.5}}/>
        <View style={styles.display}>
          <Text style={{fontSize:100}}>{this.state.display}</Text>
        </View>
        <View style={{flex:5}}>
          <View style={{flex:0.5}}/>
          <View style={styles.viewButton}>
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'lightgray'}]}
              onPress={ () => this._numSet(1) }
            >
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'lightgray'}]}
              onPress={ () => this._numSet(1) }
            >
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'lightgray'}]}
              onPress={ () => this._numSet(1) }
            >
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'lightgray'}]}
              onPress={ () => this._numSet(1) }
            >
            </TouchableOpacity>
          </View>
          <View style={styles.viewButton}>
            {NumButtons789}
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'orange'}]}
              onPress={ () => this._numSet(1) }
            />
          </View>
          <View style={styles.viewButton}>
            {NumButtons456}
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'orange'}]}
              onPress={ () => this._numSet(1) }
            />
          </View>
          <View style={styles.viewButton}>
            {NumButtons123}
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'orange'}]}
              onPress={ () => this._numSet(1) }
            />
          </View>
          <View style={{flex:0.5}}/>
        </View>
        <View style={{flex:0.5}}/>
      </View>
    );
  }

  _numSet = i => {
    this.setState({display:i});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  display: {
    flex:1,
    height:'100%',
    width:'100%',
    backgroundColor: 'lightgray'
  },
  viewButton: {
    flex:1,
    height:'100%',
    width:'100%',
    flexDirection:'row'
  },
  Button: {
    flex: 1,
    height:'100%',
    width:'100%',
    flexDirection:'row',
    borderRadius:100,
  }
});
