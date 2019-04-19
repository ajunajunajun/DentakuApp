import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, ScrollView } from 'react-native';


import jsondata from './src/formulas.json';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      strmath: '0',
      display: '0',
      operator: '',
      displayFlag: true,
      operatorFlag: false,
      AnimFlex: new Animated.Value(0), AnimFlag: true,
      AnimFlex2: new Animated.Value(1),
      modeFlag: true, modeColor:'yellow',
      addFlag:false, addColor:'yellow'
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

    var Formulas = [];
    for(let i = 0; i < Object.keys(jsondata['formulas']).length ; i++){
      Formulas.push(
        <TouchableOpacity style={{flex:1}}
          key={i}
          onPress={() => alert(i+1)}
        >
          <Text style={{fontSize:30}}>
            {jsondata.formulas[i].id}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.container}>
        <View style={{flex:0.3}}/>
        { this.state.addFlag ?
          <View style={{flex:2,width:'100%'}}>
            <View style={styles.addDisplay}>
              <Text style={{fontSize:50, marginLeft:10}}>ADD</Text>
            </View>
            <View style={{flex:0.15}}/>
          </View>
          :
          <View style={{flex:2,width:'100%'}}>
            <TouchableOpacity style={{flex:1,width:'100%'}}
              onPress={ this._AnimDisplay }
            >
              <View style={styles.display}>
                <Text style={{fontSize:50, marginLeft:10}}>{this.state.display}</Text>
              </View>
            </TouchableOpacity>
            <Animated.View style={[styles.animView,{flex: this.state.AnimFlex}]}>
              <ScrollView style={{flex:1, marginLeft:20}}>
                {Formulas}
              </ScrollView>
             </Animated.View>
            <Animated.View style={{flex:this.state.AnimFlex2}}/>
          </View>
        }
        <View style={{flex:3}}>
        { this.state.modeFlag ?
          <Text/>
          :
          <View style={styles.viewButton}>
            <TouchableOpacity style={[styles.Button,{backgroundColor:this.state.addColor}]}
              onPress={ this._openAdd }
            >
              <Text style={styles.buttonText}>add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'yellow'}]}
              onPress={ this._c }
            >
              <Text style={styles.buttonText}>del</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'yellow'}]}
              onPress={ this._c }
            >
              <Text style={styles.buttonText}>あああ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Button,{backgroundColor: 'yellow'}]}
              onPress={ () => this._Arithmetic('/') }
            >
              <Text style={styles.buttonText}>いえい</Text>
            </TouchableOpacity>
          </View>
        }
        <View style={styles.viewButton}>
          <TouchableOpacity style={[styles.Button,{backgroundColor: 'orange'}]}
            onPress={ this._ac }
          >
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.Button,{backgroundColor: 'orange'}]}
            onPress={ this._c }
          >
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.Button,{backgroundColor: this.state.modeColor}]}
            onPress={ this._AnimDisplay }
          />
          <TouchableOpacity style={[styles.Button,{backgroundColor: 'orange'}]}
            onPress={ () => this._Arithmetic('/') }
          >
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewButton}>
          {NumButtons789}
          <TouchableOpacity style={[styles.Button,{backgroundColor: 'orange'}]}
            onPress={ () => this._Arithmetic('*') }
          >
            <Text style={styles.buttonText}>*</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewButton}>
          {NumButtons456}
          <TouchableOpacity style={[styles.Button,{backgroundColor: 'orange'}]}
            onPress={ () => this._Arithmetic('-') }
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewButton}>
          {NumButtons123}
          <TouchableOpacity style={[styles.Button,{backgroundColor: 'orange'}]}
            onPress={ () => this._Arithmetic('+') }
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewButton}>
          <TouchableOpacity style={[styles.Button,{backgroundColor: 'snow'}]}
            onPress={ this._numSeto }
          >
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.Button,{backgroundColor: 'snow'}]}
            onPress={ () => this._numSet(0) }
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.equalButton,{backgroundColor: 'orange'}]}
            onPress={ this._equal }
          >
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex:0.3}}/>
    </View>
    );
  }

  _AnimDisplay = () => {
    if( this.state.AnimFlag === true ){
      Animated.timing(this.state.AnimFlex,{
        toValue: 0.85,
        duration: 300,
      }).start();
      Animated.timing(this.state.AnimFlex2,{
        toValue: 0.15,
        duration: 300,
      }).start();
      this.setState({
        AnimFlag:false,
        modeFlag:false,
        modeColor:'gold'
      });
    } else {
      Animated.timing(this.state.AnimFlex,{
        toValue: 0,
        duration: 300,
      }).start();
      Animated.timing(this.state.AnimFlex2,{
        toValue: 1,
        duration: 300,
      }).start();
      this.setState({
        AnimFlag:true,
        modeFlag:true,
        modeColor:'yellow',
        addFlag:false,
        addColor:'yellow'
      });
    }
  }
  _openAdd = () => {
    if(this.state.addFlag === true){
      this.setState({
        addFlag:false,
        addColor: 'yellow'
      });
    } else {
      this.setState({
        addFlag:true,
        addColor: 'gold'
      });

    }
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
    backgroundColor: 'snow',
    justifyContent: 'center',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
  },
  addDisplay: {
    flex:1.85,
    height:'100%',
    width:'100%',
    backgroundColor: 'snow',
    justifyContent: 'center',
    borderRadius:30,
  },
  animView: {
    width:'100%',
    backgroundColor: 'snow',
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },
  viewButton: {
    flex:1,
    height:'100%',
    width:'100%',
    flexDirection:'row',
  },
  Button: {
    flex: 1,
    height:'100%',
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:30,
  },
  equalButton: {
    flex: 2,
    height:'100%',
    width:'100%',
    borderRadius:30,
  },
  buttonText: {
    fontSize: 30,
    textAlign: 'center',
    width:'100%'
  },
});
