import React, { useState, useEffect, useContext } from 'react'
import Context from '../../contexts/Provider'
import { url } from '../../constants/urls'
import axios from 'axios'
import { ListItem, Avatar, Button, SearchBar } from 'react-native-elements'
import styles from './style'
import {
  View,
  Text,
  ScrollView,
  RefreshControl
  } from 'react-native'


export default props =>{
  const { setDetail } = useContext(Context)
  const [pizzas, setPizzas] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [search, setSearch] = useState('')



  useEffect(()=>{
    axios.get(`${url}/pizzas`).then(res=>{
      setPizzas(res.data)
    }).catch(err=>{
      alert(err.response.data)
    })
  }, [])


  const onRefresh = ()=>{
    setRefreshing(true)
    setTimeout(()=>{
      setRefreshing(false)
    }, 2000)
  }


  const found = pizzas && pizzas.filter(pizza=>{
    return pizza.name.toLowerCase().includes(search.toLowerCase())
  })


  const details = (id)=>{
    try{

      axios.get(`${url}/pizzas/${id}`).then(res=>{
        setDetail(res.data)
        props.navigation.navigate('Details')
      }).catch(err=>{
        alert(err.response.data)
      })

    }catch(e){
      console.log(e)
    }

  }



  return(
    <ScrollView  refreshControl={<RefreshControl refreshing={refreshing}
      onRefresh={onRefresh}/>}>
      <SearchBar style={styles.searchStyle}
        placeholder='Busca...'
        onChangeText={setSearch}
        value={search}/>
      {found && found.map(pizza=>{
        return(
          <ListItem key={pizza.id} bottomDivider
            onPress={()=> details(pizza.id)}>
            <Avatar source={{ uri: pizza.photo }}
              size='large'/>
            <ListItem.Content>
              <ListItem.Title style={styles.listTitle}
                >{pizza.name}</ListItem.Title>
              <ListItem.Subtitle>{pizza.ingredients}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
      })}
    </ScrollView>
  )
}
