import {StyleSheet,Text,View,Image} from 'react-native'
import logo from '../assets/images/logo.png'
import { Link } from 'expo-router'
const Home = ()=> {
  return (
    <View style={styles.container}>

        <Image source={logo} style={styles.img}/>

        <Text style={styles.title}>The Number 1</Text>

            <Text style={{marginTop:10,marginBottom:30}}>Reading List App

            </Text>
            <Link href="/about" style={styles.link}>About page</Link>
                        <Link href="/contact" style={styles.link}>Contact page</Link>

          
    </View>
  )
}

export default Home; 

const styles= StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        fontWeight:'bold',
        fontSize:18,
    },
    img:{
        marginVertical:10,
    },
      link:{
        marginVertical:10,
        borderBottomWidth:1

    }

})