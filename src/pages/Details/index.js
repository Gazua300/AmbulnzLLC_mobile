import React, { useContext, useState } from 'react'
import Context from '../../contexts/Provider'
import axios from 'axios'
import { url } from '../../constants/urls'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native'



export default props =>{
  const { detail } = useContext(Context)
  const [qnt, setQnt] = useState('')


  const order = ()=>{
    const body = {
      pizza: detail.name,
      quantity: qnt
    }
    axios.post(`${url}/orders`, body).then(res=>{
      alert(res.data)
    }).catch(err=>{
      alert(err.response.data)
    })
  }


  return(
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{detail.name}</Text>
        <Image style={styles.tinyLogo}
        source={{ uri: detail.photo }}/>
        <Text style={styles.ingredientsStyle}>
          <Text style={styles.ingredientsTitle}>
            Ingredientes: </Text>
          {detail.ingredients}</Text>
        <TextInput onChangeText={setQnt}
          value={qnt}
          style={styles.input}
          keyboardType='numeric'
          placeholder='Quantidade'/>
        <TouchableOpacity style={styles.button}
          onPress={order}>
          <Text style={styles.txtButton}>
            Fazer Pedido
          </Text>
        </TouchableOpacity>
        <Text style={styles.checkout}>
          <Text style={{fontWeight: 'bold'}}>Pizza: </Text>
          <Text>{detail.name}</Text>{'\n'}
          <Text style={{fontWeight: 'bold'}}>Preço: </Text>
          <Text>{detail.price}</Text>{'\n'}
          <Text style={{fontWeight: 'bold'}}>Quantidade: </Text>
          <Text>{qnt}</Text>{'\n'}
          <Text style={{fontWeight: 'bold'}}>Total: </Text>
          <Text>{qnt * detail.price}</Text>
        </Text>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  title: {
    margin: 15,
    fontSize: 25,
    color: 'goldenrod'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  tinyLogo: {
    width: 300,
    height: 150,
    borderRadius: 10
  },
  ingredientsStyle: {
    width: 290,
    marginTop: 10
  },
  ingredientsTitle: {
    color: 'goldenrod'
  },
  button: {
    backgroundColor: 'goldenrod',
    width: 150,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  txtButton: {
    color: 'whitesmoke'
  },
  input: {
    height: 50,
    width: 80,
    textAlign: 'center'
  },
  checkout: {
    marginTop: 5
  }
})
