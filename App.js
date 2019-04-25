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
      delFlag:false, delColor:'yellow',
      setFormulasFlag:false,
      Formulas:[], formulasCount: 0,
      setFormulasNumber: '', setFormulasText: '',
      judgeVariable:[], setVariable:[],
      setVarValue:[],
      setVariableStore:[], setVariableCount:[],
    };
  }

  componentWillMount(){
    this._init();
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
        <View style={{flex:2,width:'100%'}}>
        { this.state.addFlag ?
          <View style={styles.addDisplay}>
            <Text style={{fontSize:50, marginLeft:10,marginTop:10}}>ADD Mode</Text>
            <TextInput style={{fontSize:30, marginLeft:10,height:'10%',width:'90%'}}
              onChangeText={(addName) => this.setState({addName})}
              value={this.state.addName}
            />
            <TextInput style={{fontSize:30, marginLeft:50,height:'60%',width:'90%'}}
              onChangeText={(addText) => this.setState({addText})}
              value={this.state.addText}
            />
            <TouchableOpacity style={[styles.enterButton,{backgroundColor: 'orange'}]}
              onPress={ this._pressEnter }
            >
              <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={{flex:2,width:'100%'}}>
            {this.state.delFlag ?
              <View style={styles.addDisplay}>
                <Text style={{fontSize:50, marginLeft:10,marginTop:16}}>DEL Mode</Text>
                <ScrollView style={{flex:1, marginLeft:20}}>
                  {this.state.Formulas}
                </ScrollView>
              </View>
            :
              <View style={{flex:2, width:'100%'}}>
              {this.state.setFormulasFlag ?
                <View style={styles.addDisplay}>
                  <Text style={{fontSize:50, marginLeft:10,marginTop:16}}>Set Mode</Text>
                  <ScrollView style={{flex:1, marginLeft:20}}>
                    {this.state.Formulas[this.state.setFormulasNumber]}
                  </ScrollView>
                  <ScrollView style={{flex:1, marginLeft:20}}>
                    {this.state.setVariable}
                  </ScrollView>
                  <TouchableOpacity style={[styles.enterButton,{backgroundColor: 'orange'}]}
                    onPress={ this._pressEnterSet }
                  >
                    <Text style={styles.buttonText}>Enter</Text>
                  </TouchableOpacity>
                </View>
              :
                <View style={{flex:2, width:'100%'}}>
                  <Animated.View style={{flex:this.state.AnimFlex2}}/>
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
                </View>
              }
              </View>
            }
          </View>
        }
        </View>
        <View style={{flex:0.2}}/>
        <View style={{flex:3}}>
        { this.state.modeFlag ?
          <View style={{flex:0}}/>
          :
          <View style={styles.viewButton}>
            <TouchableOpacity style={[styles.Button,{backgroundColor:this.state.addColor}]}
              onPress={ this._openAdd }
            >
              <Text style={styles.buttonText}>add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Button,{backgroundColor:this.state.delColor}]}
              onPress={ this._openDel }
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

  _init = async() => {
    let object = {
      'count': this.state.formulasCount,
      'formulas': [
      ],
    };
    try {
      await AsyncStorage.mergeItem('formulas',JSON.stringify(object));

      const value = await AsyncStorage.getItem('formulas');
      const data = JSON.parse(value);

      const count = data.count;
      this.setState({formulasCount:count});

      for( i = 0; i < this.state.formulasCount; i++){
        this.state.Formulas.push(
          <TouchableOpacity style={{flex:1}}
            onPress={ () => this._setFormulas(i)}
            key={i}
          >
          <Text style={{fontSize:25, width:'95%'}}>
            {data.formulas[i].name}:
          </Text>
          <Text style={{fontSize:25, width:'95%', marginLeft:40}}>
            {data.formulas[i].text}
          </Text>
          </TouchableOpacity>
        );
      }
    } catch (err) {
      alert('error');
    }
  }
  _AnimDisplay = () => {
    if( this.state.setFormulasFlag == true || this.state.addFlag == true || this.state.delFlag == true ){
      this.setState({
        setFormulasFlag:false,
        addFlag:false,
        delFlag:false,
        addColor:'yellow',
        delColor:'yellow'
      });
    } else if( this.state.AnimFlag === true ){
      Animated.timing(this.state.AnimFlex,{
        toValue: 1,
        duration: 300,
      }).start();
      Animated.timing(this.state.AnimFlex2,{
        toValue: 0,
        duration: 300,
      }).start();
      Animated.timing(this.state.AnimRadius,{
        toValue: 0,
        duration: 80,
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
        addColor:'yellow',
        delFlag:false,
        delColor:'yellow',
        setFormulasFlag:false
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
        addColor: 'gold',
        delFlag:false,
        delColor: 'yellow',
        setFormulasFlag:false
      });
    }
  }
  _pressEnter = async () => {
    let addobject = {'name': this.state.addName, 'text': this.state.addText};
    let judgeFlag = false;
    const patternName = new RegExp('.');
    const patternText = new RegExp('^ *(([a-zA-Z] *|[0-9] *)+([-+*\/] +)?)*([a-zA-Z]|[0-9])+ += *$');
    //100x の x だけを変数で処理したいので100 x って入力にさせたい
    //あとおなじ変数名が複数出てきたら二つ目以降は無視したい
    judgeNameFlag = patternName.test(this.state.addName);
    judgeTextFlag = patternText.test(this.state.addText);
    if(judgeNameFlag == true && judgeTextFlag == true){
      try{
        this.setState({
          formulasCount: this.state.formulasCount+1
        });

        const value = await AsyncStorage.getItem('formulas');
        const data = JSON.parse(value);
        data.formulas.push(addobject);
        data.count += 1;
        await AsyncStorage.mergeItem('formulas',JSON.stringify(data));

        const count = this.state.formulasCount - 1;
        this.state.Formulas.push(
          <TouchableOpacity style={{flex:1}}
            onPress={() => this._setFormulas(count)}
            key={count}
          >
            <Text style={{fontSize:25, width:'95%'}}>
              {data.formulas[count].name}:
            </Text>
            <Text style={{fontSize:25, width:'95%', marginLeft:40}}>
              {data.formulas[count].text}
            </Text>
          </TouchableOpacity>
        );
        this.setState({
          addFlag:false,
          addColor:'yellow'
        })
        alert('success');
      } catch (error) {
        alert('error');
      }
    } else {
      alert('入力に違反があります');
    }
  }
  _pressEnterSet = () => {
    for(i = 0; i < this.state.setVariableCount.length; i++){
      this.state.setVariableStore[this.state.setVariableCount[i]] = this.state.setVarValue[i];
    }

    const patternVar = new RegExp('[0-9]+');
    for(i = 1; i < this.state.setVariableStore.length-1; i++){
      if(patternVar.test(this.state.setVariableStore[i-1]) == patternVar.test(this.state.setVariableStore[i])){
        this.state.setVariableStore.splice(i,0,'*');
        i++;
      }
    }

    const patternOperator1 = new RegExp('[*\/]');
    const patternOperator2 = new RegExp('[-+]');

    var operatorstr = '';
    for(i = 0, operator= -1; i < this.state.setVariableStore.length ; i++){
      if(patternOperator1.test(this.state.setVariableStore[i]) == true){
        operator = i;
        break;
      }
    }
    while(operator != -1){
      operatorstr = this.state.setVariableStore[operator];
      str1 = this.state.setVariableStore[operator-1];
      str2 = this.state.setVariableStore[operator+1];
      switch (operatorstr) {
        case '*':
          str = Number(str1) * Number(str2);
          break;
        case '/':
          str = Number(str1) / Number(str2);
          break;
      }
      this.state.setVariableStore[operator-1] = str;
      this.state.setVariableStore.splice(operator,2);
      for(i = 0, operator= -1; i < this.state.setVariableStore.length ; i++){
        if(patternOperator1.test(this.state.setVariableStore[i]) == true){
          operator = i;
          break;
        }
      }
    };

    for(i = 0, operator= -1; i < this.state.setVariableStore.length ; i++){
      if(patternOperator2.test(this.state.setVariableStore[i]) == true){
        operator = i;
        break;
      }
    }
    while(operator != -1){
      operatorstr = this.state.setVariableStore[operator];
      str1 = this.state.setVariableStore[operator-1];
      str2 = this.state.setVariableStore[operator+1];
      switch (operatorstr) {
        case '+':
          str = Number(str1) + Number(str2);
          break;
        case '-':
          str = Number(str1) - Number(str2);
          break;
      }
      this.state.setVariableStore[operator-1] = str;
      this.state.setVariableStore.splice(operator,2);
      for(i = 0, operator= -1; i < this.state.setVariableStore.length ; i++){
        if(patternOperator2.test(this.state.setVariableStore[i]) == true){
          operator = i;
          break;
        }
      }
    };
    this.setState({setFormulasFlag:false});
    alert(this.state.setVariableStore[0]);
  }
  _openDel = () => {
    if(this.state.delFlag === true){
      this.setState({
        delFlag:false,
        delColor: 'yellow'
      });
    } else {
      this.setState({
        delFlag:true,
        delColor: 'gold',
        addFlag:false,
        addColor: 'yellow',
        setFormulasFlag:false
      });
    }
  }
  _setFormulas = async i => {
    let object = {
      'count': this.state.formulasCount,
      'formulas': [
      ],
    };
    if(this.state.delFlag === true){
      //確認を表示
      try {
        const value = await AsyncStorage.getItem('formulas');
        const data = JSON.parse(value);

        data.formulas.splice(i,1);
        data.count -= 1;
        await AsyncStorage.setItem('formulas',JSON.stringify(data));

        this.setState({
          formulasCount:data.count,
          Formulas: []
        });
        const count = this.state.formulasCount;
        for( j = 0; j < this.state.formulasCount; j++){
          const store = j;
          this.state.Formulas.push(
            <TouchableOpacity style={{flex:1}}
              onPress={ () => this._setFormulas(store) }
              key={store}
            >
            <Text style={{fontSize:25, width:'95%'}}>
              {data.formulas[j].name}:
            </Text>
            <Text style={{fontSize:25, width:'95%', marginLeft:40}}>
              {data.formulas[j].text}
            </Text>
            </TouchableOpacity>
          );
        }
      } catch (err) {
        alert('error');
      }
    } else {
      try {
        const value = await AsyncStorage.getItem('formulas');
        const data = JSON.parse(value);
        this.setState({
          setFormulasFlag:true,
          setFormulasNumber:i,
          setFormulasText:data.formulas[i].text
        });
        const patternBlank = new RegExp(' +');
        const patternVar = new RegExp('[a-zA-Z]+');
        this.state.setVariableStore = data.formulas[i].text.split(patternBlank);
        this.state.judgeVariable = data.formulas[i].text.split(patternBlank);
        this.state.setVariableCount = [];
        for(j = this.state.judgeVariable.length-1; j >= 0 ; j--){
          judgeVariableFlag = patternVar.test(this.state.judgeVariable[j]);
          if(judgeVariableFlag == false){
            this.state.judgeVariable.splice(j,1);
          } else {
            this.state.setVariableCount.unshift(j);
          }

        }
        this.state.setVariable = [];
        this.state.setVarValue = [];
        for(j = 0; j < this.state.judgeVariable.length ; j++){
          const store = j;
          this.state.setVariable.push(
            <View style={{flex:1, flexDirection:'row'}} key={j}>
              <Text style={{fontSize:30, marginLeft:10}}>{this.state.judgeVariable[j]}:</Text>
              <TextInput style={{fontSize:30, marginLeft:10}}
                onChangeText={ text => this._valueChange(store,text) }
                placeholder = 'value'
              />
            </View>
          );
          this.state.setVarValue.push('');
        }
      } catch (err) {
        alert('error');
      }
    }
    this.setState({});
  }
  _valueChange = (j,text) => {
    var copy = this.state.setVarValue.slice();
    copy[j] = text;
    this.setState({setVarValue: copy});
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
    // いい感じのつくって
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
    flex:2,
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
