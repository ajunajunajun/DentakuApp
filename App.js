import React from 'react';
import {
  StyleSheet, Text, View, Alert, TouchableOpacity, Animated, ScrollView, TextInput, AsyncStorage
} from 'react-native';

// 新しい式を上に表示（つかったのも上に）
// 並び変え
// リストをアクションで大きく
// 入力方法の変更
// = を文字列の最後に常時設置
// .Buttonの機能変更
// () の対応
// * -> x  わる変更

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
      AnimRadius: new Animated.Value(15),
      modeFlag: true, modeColor:'yellow',
      addFlag:false, addColor:'yellow',
      addName: 'name', addText: 'Aa + 2 b / 2 = ',
      setFlag:true, setColor:'gold',
      delFlag:false, delColor:'yellow',
      setFormulasFlag:false,
      Formulas:[], formulasCount: 0,
      setFormulasNumber: '', setFormulasText: '',
      judgeVariable:[], setVariable:[],
      setVarValue:[],
      setVariableStore:[], setVariableCount:[],
      setVariableFlex:1
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
            <View style={{flex:0.6,borderBottomWidth:1,borderColor:'black'}}>
              <Text style={{fontSize:50, marginLeft:10,marginTop:20}}>ADD MODE</Text>
            </View>
            <View style={{flex:1}}>
              <TextInput style={{fontSize:30, marginLeft:10,marginTop:10,width:'90%'}}
                onChangeText={(addName) => this.setState({addName})}
                placeholder = 'name'
              />
              <TextInput style={{fontSize:30, marginLeft:45,marginTop:20,width:'80%'}}
                onChangeText={(addText) => this.setState({addText})}
                placeholder = 'a + 2 b / 2 = '
              />
            </View>
            <TouchableOpacity style={[styles.infoButton,{backgroundColor: 'snow'}]}
              onPress={ this._alertInfo }
            >
              <Text style={styles.buttonText}>?</Text>
            </TouchableOpacity>
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
                <View style={{flex:0.6,width:'100%',borderBottomWidth:1,borderColor:'black'}}>
                  <Text style={{fontSize:50, marginLeft:10,marginTop:20}}>DEL MODE</Text>
                </View>
                <ScrollView style={{flex:1, marginLeft:20}}>
                  {this.state.Formulas}
                </ScrollView>
              </View>
            :
              <View style={{flex:2, width:'100%'}}>
              {this.state.setFormulasFlag ?
                <View style={styles.addDisplay}>
                  <View style={{flex:0.6,width:'100%',borderBottomWidth:1,borderColor:'black'}}>
                    <Text style={{fontSize:50, marginLeft:10,marginTop:20}}>SET MODE</Text>
                  </View>
                  <View style={{flex:1}}>
                    <ScrollView style={{flex:0.3, marginLeft:20,height:'50%'}}>
                      {this.state.Formulas[this.state.setFormulasNumber]}
                    </ScrollView>
                    <ScrollView style={{flex:0.7, marginLeft:20,width:'70%'}}>
                      {this.state.setVariable}
                    </ScrollView>
                  </View>
                  <TouchableOpacity style={[styles.enterButton,{backgroundColor: 'orange'}]}
                    onPress={ this._pressEnterSet }
                  >
                    <Text style={styles.buttonText}>Enter</Text>
                  </TouchableOpacity>
                </View>
              :
                <View style={{flex:2, width:'100%'}}>
                  <Animated.View style={{flex:this.state.AnimFlex2}}/>
                  <TouchableOpacity style={{flex:0.6,width:'100%',borderBottomWidth:1,borderColor:'black'}}
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
              <Text style={styles.buttonText}>ADD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Button,{backgroundColor:this.state.setColor}]}
              onPress={ this._openSet }
            >
              <Text style={styles.buttonText}>LIST</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Button,{backgroundColor:this.state.delColor}]}
              onPress={ this._openDel }
            >
              <Text style={styles.buttonText}>DEL</Text>
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
          >
          {this.state.modeFlag ?
            <Text style={styles.buttonText}>OPEN</Text>
          :
            <Text style={styles.buttonText}>CLOSE</Text>
          }
          </TouchableOpacity>
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
      const initvalue = await AsyncStorage.getItem('formulas');
      if(initvalue){}else{
        await AsyncStorage.setItem('formulas',JSON.stringify(object));
      }
      const value = await AsyncStorage.getItem('formulas');
      const data = JSON.parse(value);

      const count = data.count;
      this.setState({formulasCount:count});

      for( i = 0; i < this.state.formulasCount; i++){
        const store = i;

        this.state.Formulas.push(
          <TouchableOpacity style={{flex:1}}
            onPress={ () => this._setFormulas(store)}
            key={i}
          >
          <Text style={{fontSize:25, width:'95%'}}>
            {data.formulas[store].name}:
          </Text>
          <Text style={{fontSize:25, width:'95%', marginLeft:40}}>
            {data.formulas[store].text}
          </Text>
          </TouchableOpacity>
        );
      }
    } catch (err) {
      alert('ERROR');
    }
  }
  _AnimDisplay = () => {
    if( this.state.AnimFlag === true ){
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
        toValue: 15,
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
        setFlag:true,
        setColor:'gold',
        setFormulasFlag:false,
        addName: 'name',
        addText: 'Aa + 2 b / 2 = '
      });

    }
  }
  _openAdd = () => {
    if(this.state.addFlag === true){
      this.setState({
        addFlag:false,
        addColor: 'yellow',
        setColor: 'gold',
        addName: 'name',
        addText: 'Aa + 2 b / 2 = '
      });
    } else {
      this.setState({
        addFlag:true,
        addColor: 'gold',
        delFlag:false,
        delColor: 'yellow',
        setFlag:false,
        setColor: 'yellow',
        setFormulasFlag:false
      });
    }
  }
  _openSet = () => {
    if(this.state.setFlag === true){
      this.setState({
        setFormulasFlag:false,
      });
    } else {
      this.setState({
        addFlag:false,
        addColor: 'yellow',
        delFlag:false,
        delColor: 'yellow',
        setFlag:true,
        setColor: 'gold',
        setFormulasFlag:false,
        addName: 'name',
        addText: 'Aa + 2 b / 2 = '
      });
    }
  }
  _pressEnter = async () => {
    let addobject = {'name': this.state.addName, 'text': this.state.addText};
    let judgeFlag = false;
    const patternName = new RegExp('.');
    const patternText = new RegExp('^ *(([a-zA-Z] *|[0-9] *)+([-+*\/] +)?)*([a-zA-Z]|[0-9])+ += *$');
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
            <Text style={{fontSize:25, width:'90%'}}>
              {data.formulas[count].name}:
            </Text>
            <Text style={{fontSize:25, width:'80%', marginLeft:40}}>
              {data.formulas[count].text}
            </Text>
          </TouchableOpacity>
        );
        Alert.alert("SUCCESS",'LISTに追加しました');
        this.setState({
          addName: 'name',
          addText: 'Aa + 2 b / 2 = ',
        });
      } catch (error) {
        alert('ERROR');
      }
    } else {
      Alert.alert("ERROR",'入力に問題があります');
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

    var ans = [];
    var str;
    for(i = 0; this.state.setVariableStore[i] != '='; i++){
      ans[i] = this.state.setVariableStore[i];
    }

    const patternOperator1 = new RegExp('[*\/] *$');
    const patternOperator2 = new RegExp('[-+] *$');

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
    const patternOperator3 = new RegExp('^ *[-+*\/ 0-9=]* *$');
    var iserror;
    for(i = 0, operator= -1; i < this.state.setVariableStore.length ; i++){
      if(patternOperator3.test(this.state.setVariableStore[i]) == false){
        iserror = true;
        break;
      }
    }
    if(iserror){
      Alert.alert("ERROR",'入力に問題があります');
    } else {
      Alert.alert("RESULT",ans.join(' ') + '\n = ' + this.state.setVariableStore[0]);
      this.setState({
        strmath: this.state.setVariableStore[0],
        display: this.state.setVariableStore[0],
        operator: '',
        displayFlag: true,
        operatorFlag: true
      });
    }
  }
  _openDel = () => {
    if(this.state.delFlag === true){
      this.setState({
        delFlag:false,
        delColor: 'yellow',
        setFlag: true,
        setColor: 'gold'
      });
    } else {
      this.setState({
        delFlag:true,
        delColor: 'gold',
        addFlag:false,
        addColor: 'yellow',
        setFlag:false,
        setColor: 'yellow',
        setFormulasFlag:false,
        addName: 'name',
        addText: 'Aa + 2 b / 2 = '
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
      const value = await AsyncStorage.getItem('formulas');
      const data = JSON.parse(value);

      Alert.alert('DELETE',data.formulas[i].name +'\n' + data.formulas[i].text + '\nを消去しますか？',[
        {text:'CANCEL', onPress: this._setCancelFlag, style:'cancel' },
        {text:'DELETE', onPress: () => this._setDeleteFlag(i), style:'destructive' }
      ],
      { cancelable: false }
      );
    } else {
      try {
        const value = await AsyncStorage.getItem('formulas');
        const data = JSON.parse(value);
        this.setState({
          setFlag:false,
          setColor:'yellow',
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
          var setFlex = 'flex';
          for(k = 0; k < j; k++){
            if(this.state.setVariableStore[j] == this.state.setVariableStore[k]){
              setFlex = 'none';
              break;
            }
          }
          this.setState();
          this.state.setVariable.push(
            <View style={{display:setFlex,flexDirection:'row'}} key={j}>
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
        alert('ERROR');
      }
    }
    this.setState({});
  }
  _valueChange = (j,text) => {
    var copy = this.state.setVarValue.slice();
    for(i = 0; i < this.state.setVariableStore.length; i++){
      if(this.state.setVariableStore[j] == this.state.setVariableStore[i]){
        copy[i] = text;
      }
    }
    this.setState({setVarValue: copy});
  }
  _setDeleteFlag = async (i) => {
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
    this.setState({});
  }
  _setCancelFlag = () => {
  }
  _alertInfo = () => {
    Alert.alert(
      "INFOMATION",
      "現在' + - * / 'に対応しています。\n数字、記号間には半角空白を入力してください。\nローマ字を含む文字列は変数として扱われます。\n式の最後には' = 'を入力してください。\n' * 'は省略可能です。\n"
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
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
  },
  addDisplay: {
    flex:2,
    height:'100%',
    width:'100%',
    backgroundColor: 'snow',
    justifyContent: 'center',
    borderRadius:15,
  },
  animView: {
    width:'100%',
    backgroundColor: 'snow',
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
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
    borderRadius:15,
    borderWidth:0.5,
    borderColor:'black'
  },
  enterButton: {
    position: 'absolute',
    height:'20%',
    width:'20%',
    right: 10,
    bottom:10,
    borderRadius:15,
    borderWidth:1,
    borderColor:'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoButton: {
    position: 'absolute',
    height:50,
    width:50,
    right:10,
    top:10,
    borderRadius:90,
    borderWidth:0.5,
    borderColor:'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  equalButton: {
    flex: 2,
    height:'100%',
    width:'100%',
    borderRadius:15,
    borderWidth:0.5,
    borderColor:'black'
  },
  buttonText: {
    fontSize: 25,
    textAlign: 'center',
    width:'100%'
  },
});
