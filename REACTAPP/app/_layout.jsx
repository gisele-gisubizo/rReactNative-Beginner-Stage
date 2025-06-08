import { Slot, Stack } from 'expo-router'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'


const RootLayout = () => {

    const colorScheme = useColorScheme()
    console.log(colorScheme)

  return (
   
   <Stack ScreenOptions={
    {
        headerStyle:{backgroundColor:'#ddd'},
        headerTintColor:'#333',
    }
   }>
    <Stack.Screen name="index" options={{title: 'Home'}}/>
        <Stack.Screen name="about" options={{title: 'About'}}/>
            <Stack.Screen name="contact" options={{title: 'Contact',headerShown:false}}/>
   </Stack>  
     
   
  )
}

export default RootLayout

const styles = StyleSheet.create({})