import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      strmath: '0',
      display: '0',
      operator: '',
      displayFlag: true,
      operatorFlag: false,
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
            <Text style={styles.buttonText}>{i}</Text>
          </TouchableOpacity>
        );
      } else if(i < 7) {
        NumButtons456.push(
          <TouchableOpacity style={[styles.Button,{backgroundColor: 'snow'}]}
            key={i}
            onPress={ () => this._numSet(i) }
          >
            <Text style={styles.buttonText}>{i}</Text>
          </TouchableOpacity>
        );
      } else {
        NumButtons789.push(
          <TouchableOpacity style={[styles.Button,{backgroundColor:'snow'}]}
            key={i}
            onPress={ () => this._numSet(i) }
          >
            <Text style={styles.buttonText}>{i}</Text>
          </TouchableOpacity>
        );
      }
    }
    return (
      <View style={styles.container}>
        <View style={{flex:0.3}}/>
        <View style={styles.display}>
          <Text style={{fontSize:70, marginLeft:10}}>{this.state.display}</Text>
        </View>
        <View style={{flex:0.5}}/>
        <View style={{flex:3}}>
          <View style={styles.viewButton}>
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'lightgray'}]}
              onPress={ () => this._Arithmetic('+') }
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'lightgray'}]}
              onPress={ () => this._Arithmetic('-') }
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'lightgray'}]}
              onPress={ () => this._Arithmetic('*') }
            >
              <Text style={styles.buttonText}>*</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'lightgray'}]}
              onPress={ () => this._Arithmetic('/') }
            >
              <Text style={styles.buttonText}>/</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewButton}>
            {NumButtons789}
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'orange'}]}
              onPress={ this._ac }
            >
              <Text style={styles.buttonText}>AC</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewButton}>
            {NumButtons456}
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'orange'}]}
              onPress={ this._c }
            >
              <Text style={styles.buttonText}>C</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewButton}>
            {NumButtons123}
            <View style={{flex:1}}/>
          </View>
          <View style={styles.viewButton}>
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'snow'}]}
              onPress={ () => this._numSet(0) }
            >
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'snow'}]}
              onPress={ this._numSet00 }
            >
              <Text style={styles.buttonText}>00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'snow'}]}
              onPress={ this._numSeto }
            >
              <Text style={styles.buttonText}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.equalButton,{backgroundColor: 'orange'}]}
              onPress={ this._equal }
            >
              <Text style={styles.buttonText}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex:0.5}}/>
      </View>
    );
  }

  _numSet00 = () => {
    if(this.state.displayFlag == true){
      let str = this.state.display;
      this.setState({
        strmath:str,
        display: 0,
        displayFlag: false
      });
    } else {
      let str = this.state.display*100;
      this.setState({display:str});
    }
    this.setState({
      operatorFlag: true
    });
  }
  _numSeto = () => {
    let str = this.state.display/10;
    this.setState({display:str});
  }
  _numSet = i => {
    if(this.state.displayFlag == true){
      let str = this.state.display;
      this.setState({
        strmath:str,
        display: i,
        displayFlag: false
      });
    } else {
      let str = this.state.display*10 + i;
      this.setState({display:str});
    }
    this.setState({
      operatorFlag: true
    });
  }
  _Arithmetic = c => {
    // want change the operator when second pushed
    if( this.state.operatorFlag == true){
      if(this.state.operator !== ''){
        let str;
        switch (this.state.operator){
          case '+':
            str = this.state.strmath + this.state.display;
            break;
          case '-':
            str = this.state.strmath - this.state.display;
            break;
          case '*':
            str = this.state.strmath * this.state.display;
            break;
          case '/':
            str = this.state.strmath / this.state.display;
            break;
        }
        this.setState({
          strmath:str,
          display:str
        });
      } else {
        this.setState({
          strmath:this.state.display,
        });
      }
      this.setState({
        operator:c,
        displayFlag: true,
        operatorFlag: false
      });
    }
  }
  _ac = () => {
    this.setState({
      strmath: '0',
      display: '0',
      operator: '',
      displayFlag: true,
      operatorFlag: false
    });
  }
  _c = () => {
    if(this.state.operatorFlag == true || this.state.operator !== ''){
      this.setState({ display: '0'});
    }
  }
  _equal = () => {
    let str = this.state.strmath;
    if(this.state.strmath == '0'){
      str = this.state.display;
    }
    if(this.state.operator !== ''){
      switch (this.state.operator){
        case '+':
          str = this.state.strmath + this.state.display;
          break;
        case '-':
          str = this.state.strmath - this.state.display;
          break;
        case '*':
          str = this.state.strmath * this.state.display;
          break;
        case '/':
          str = this.state.strmath / this.state.display;
          break;
      }
    } else {
      str = this.state.display;
    }
    this.setState({
      strmath: str,
      display: str,
      operator: '',
      displayFlag: true,
      operatorFlag: true
    });
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
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    borderRadius:15,
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
    borderRadius:30,
  },
  equalButton: {
    flex: 1,
    bottom:'25%',
    paddingBottom:'50%',
    height:'100%',
    width:'100%',
    borderRadius:30,
  },
  buttonText: {
    fontSize: 50,
    textAlign: 'center',
    width:'100%'
  },
});
