import { StyleSheet } from 'react-native'

export const sharedStyles = StyleSheet.create({
    mainButton: {
        position: 'absolute',
        left: 135,
        top: 510,
    },
    fontGrey:{
        fontSize: 16,
        color: '#9B9B9B'
    },

    fontGreyBig:{
        fontSize: 22,
        color: '#9B9B9B'
    },

    fontMain:{
        fontSize: 20,
        color: '#C42E34'
    },

    fontMainBig:{
        fontSize: 24,
        color: '#C42E34'
    },

    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    title: {
        flexDirection:'row',
        justifyContent:'center', 
        marginTop:18, 
        marginBottom:10
    },
})

export const BASE_API_URL = "http://128.199.191.123:8000/api"
