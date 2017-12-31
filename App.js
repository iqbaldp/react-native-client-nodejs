import React, { Component } from 'react';

import { StyleSheet, View, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';

import { StackNavigator } from 'react-navigation';

class MainActivity extends Component {

  static navigationOptions =
  {
     title: 'Data Mahasiswa',
  };

constructor(props) {

   super(props)

   this.state = {

     nama: '',
     jurusan: '',
     semester: '',

   }

 }

 InsertStudentRecordsToServer = () =>{

      fetch('http://192.168.43.217:3000/api/mahasiswa', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        nama : this.state.nama,

        jurusan : this.state.jurusan,

        semester : this.state.semester

      })

      }).then((response) => response.json())
          .then((responseJson) => {

            Alert.alert(responseJson);

          }).catch((error) => {
            console.error(error);
          });

}

 GoTo_Show_StudentList_Activity_Function = () =>
  {
    this.props.navigation.navigate('Second');
    
  }

 render() {
   return (

<View style={styles.MainContainer}>


       <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Student Registration Form </Text>
 
       <TextInput
         
         placeholder="Nama"

         onChangeText={ TextInputValue => this.setState({ nama : TextInputValue }) }

         underlineColorAndroid='transparent'

         style={styles.TextInputStyleClass}
       />

      <TextInput
         
         placeholder="Jurusan"

         onChangeText={ TextInputValue => this.setState({ jurusan : TextInputValue }) }

         underlineColorAndroid='transparent'

         style={styles.TextInputStyleClass}
       />

      <TextInput
         
         placeholder="Semesteer"

         onChangeText={ TextInputValue => this.setState({ semester : TextInputValue }) }

         underlineColorAndroid='transparent'

         style={styles.TextInputStyleClass}
       />

      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.InsertStudentRecordsToServer} >

        <Text style={styles.TextStyle}> Tambahkan Data </Text>

      </TouchableOpacity>

      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.GoTo_Show_StudentList_Activity_Function} >

        <Text style={styles.TextStyle}> Daftar Mahasiswa </Text>

      </TouchableOpacity>
 

</View>
           
   );
 }
}

class ShowStudentListActivity extends Component {

  constructor(props) { 

    super(props);

    this.state = {

      isLoading: true

    }
  }

  static navigationOptions =
  {
     title: 'Daftar Mahasiswa',
  };

  componentDidMount() {
    
       return fetch('http://192.168.43.217:3000/api/mahasiswa')
         .then((response) => response.json())
         .then((responseJson) => {
           let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
           this.setState({
             isLoading: false,
             dataSource: ds.cloneWithRows(responseJson),
           }, function() {
             
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }
    
     GetStudentIDFunction=(_id,nama, jurusan, semester)=>{

          this.props.navigation.navigate('Third', { 

            ID : _id,
            NAMA : nama,
            JURUSAN : jurusan,
            SEMESTER : semester

          });

     }

     ListViewItemSeparator = () => {
       return (
         <View
           style={{
             height: .5,
             width: "100%",
             backgroundColor: "#000",
           }}
         />
       );
     }

     render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
   
      return (
   
        <View style={styles.MainContainer_For_Show_StudentList_Activity}>
   
          <ListView
   
            dataSource={this.state.dataSource}
   
            renderSeparator= {this.ListViewItemSeparator}
   
            renderRow={ (rowData) => <Text style={styles.rowViewContainer} 

                      onPress={this.GetStudentIDFunction.bind(
                        this, rowData._id,
                         rowData.nama, 
                         rowData.jurusan, 
                         rowData.semester
                         )} > 

                      {rowData.nama} 
                      
                      </Text> }
   
          />
   
        </View>
      );
    }

}

class EditStudentRecordActivity extends Component {
  
  constructor(props) {
    
       super(props)
    
       this.state = {
    
         _id: '',
         nama: '',
         jurusan: '',
         semester: '',
    
       }
    
     }

     componentDidMount(){

      this.setState({ 
        _id : this.props.navigation.state.params._id,
        nama: this.props.navigation.state.params.nama,
        jurusan: this.props.navigation.state.params.jurusan,
        semester: this.props.navigation.state.params.semester,
      })

     }
  
    static navigationOptions =
    {
       title: 'Sunting Data Mahasiswa',
    };

    UpdateStudentRecord = () =>{
      
            fetch('', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
      
              student_id : this.state.TextInput_Student_ID,

              student_name : this.state.TextInput_Student_Name,
      
              student_class : this.state.TextInput_Student_Class,
      
              student_phone_number : this.state.TextInput_Student_PhoneNumber,
      
              student_email: this.state.TextInput_Student_Email
      
            })
      
            }).then((response) => response.json())
                .then((responseJson) => {
      
                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);
      
                }).catch((error) => {
                  console.error(error);
                });
      
      }


    DeleteStudentRecord = () =>{
        
          fetch('', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
        
            student_id : this.state.TextInput_Student_ID
        
          })
        
          }).then((response) => response.json())
          .then((responseJson) => {
        
            Alert.alert(responseJson);
        
          }).catch((error) => {
             console.error(error);
          });

          this.props.navigation.navigate('First');

      }

    render() {

      return (
   
   <View style={styles.MainContainer}>
   
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Edit Student Record Form </Text>
    
          <TextInput
            
            placeholder="Student Name Shows Here"
            
            value={this.state.TextInput_Student_Name}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_Student_Name : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TextInput
            
            placeholder="Student Class Shows Here"

            value={this.state.TextInput_Student_Class}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_Student_Class : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TextInput
            
            placeholder="Student Phone Number Shows Here"

            value={this.state.TextInput_Student_PhoneNumber}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_Student_PhoneNumber : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
          <TextInput
   
            placeholder="Student Email Shows Here"

            value={this.state.TextInput_Student_Email}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_Student_Email : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateStudentRecord} >
   
            <Text style={styles.TextStyle}> UPDATE STUDENT RECORD </Text>
   
         </TouchableOpacity>
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.DeleteStudentRecord} >
   
            <Text style={styles.TextStyle}> DELETE CURRENT RECORD </Text>
   
         </TouchableOpacity>
    
   
   </View>
              
      );
    }

}

export default MyNewProject = StackNavigator(

  {

    First: { screen: MainActivity },

    Second: { screen: ShowStudentListActivity },

    Third: { screen: EditStudentRecordActivity }

  });

const styles = StyleSheet.create({

  MainContainer :{

    alignItems: 'center',
    flex:1,
    paddingTop: 30,
    backgroundColor: '#fff'

  },

  MainContainer_For_Show_StudentList_Activity :{
    
    flex:1,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    marginLeft: 5,
    marginRight: 5
    
    },

  TextInputStyleClass: {

  textAlign: 'center',
  width: '90%',
  marginBottom: 7,
  height: 40,
  borderWidth: 1,
  borderColor: '#FF5722',
  borderRadius: 5 ,

  },

  TouchableOpacityStyle: {

    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width: '90%',
    backgroundColor: '#00BCD4'

  },

  TextStyle:{
    color:'#fff',
    textAlign:'center',
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }
  });
