import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Animated, ScrollView, TextInput, AsyncStorage
} from 'react-native';

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
      AnimRadius: new Animated.Value(30),
      modeFlag: true, modeColor:'yellow',
      addFlag:false, addColor:'yellow',
      addName: 'name', addText: 'a + b * 2 = ',
      Formulas:[], formulasCount: 0
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
        <View style={{flex:0.4}}/>
        { this.state.addFlag ?
          <View style={{flex:2,width:'100%'}}>
            <View style={styles.addDisplay}>
              <Text style={{fontSize:50, marginLeft:10}}>ADD Mode</Text>
              <TextInput style={{fontSize:40, marginLeft:10,height:'10%',width:'90%'}}
                onChangeText={(addName) => this.setState({addName})}
                value={this.state.addName}
              />
              <TextInput style={{fontSize:30, marginLeft:10,height:'60%',width:'90%'}}
                onChangeText={(addText) => this.setState({addText})}
                value={this.state.addText}
                multiline
              />
              <TouchableOpacity style={[styles.enterButton,{backgroundColor: 'orange'}]}
                onPress={ this._pressEnter }
              >
                <Text style={styles.buttonText}>Enter</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex:0.15}}/>
          </View>
          :
          <View style={{flex:2,width:'100%'}}>
            <TouchableOpacity style={{flex:1,width:'100%'}}
              onPress={ this._AnimDisplay }
            >
              <Animated.View style={[styles.display,{borderBottomLeftRadius: this.state.AnimRadius, borderBottomRightRadius: this.state.AnimRadius}]}>
                <Text style={{fontSize:50, marginLeft:10}}>{this.state.display}</Text>
              </Animated.View>
            </TouchableOpacity>
            <Animated.View style={[styles.animView,{flex: this.state.AnimFlex,borderTopLeftRadius: this.state.AnimRadius, borderTopRightRadius: this.state.AnimRadius}]}>
              <ScrollView style={{flex:1, marginLeft:20}}>
                {this.state.Formulas}
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
      Animated.timing(this.state.AnimRadius,{
        toValue: 0,
        duration: 30,
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
      Animated.timing(this.state.AnimRadius,{
        toValue: 30,
        duration: 1000,
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
  _pressEnter = async () => {
    let object = {formulas:{'name': this.state.addName, 'text': this.state.addText}};
    try{
      await AsyncStorage.setItem('formulas',JSON.stringify(object));
      const value = await AsyncStorage.getItem('formulas');
      //仮count いずれStorageにいれなきゃ
      //はじめに全部ロードかかなきゃ、ここじゃだめ
      //というかlengthで全部を取得って形にしなきゃ
      //さっさとvalue.nameみたいな感じで一つづつ取得する書き方しらべて
      this.setState({formulasCount:this.state.formulasCount+1});
      const count = this.state.formulasCount;
      this.state.Formulas.push(
        <TouchableOpacity style={{flex:1}}
          onPress={() => alert(count)}
          key={this.state.formulasCount}
        >
          <Text style={{fontSize:20, width:'95%'}}>
            {value}
          </Text>
        </TouchableOpacity>
      );
      alert('success');
    } catch (error) {
      alert('error');
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
  enterButton: {
    position: 'absolute',
    height:'20%',
    width:'20%',
    right: 10,
    bottom:10,
    borderRadius:30,
    alignItems: 'center',
    justifyContent: 'center',
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
