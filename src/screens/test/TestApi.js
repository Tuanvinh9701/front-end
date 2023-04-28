import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { createAPIEndpoint, BASE_URL } from '../../api'

export default function TestApi() {

    const [kq, setkq] = useState()

    let timer;

    // const startTimer = () => {
    //     timer = setInterval(() => {
    //         setTimeTaken(prev => prev + 1)
    //     }, [1000])
    // }

    useEffect(() => {
        createAPIEndpoint('bestSeller')
            .fetch() 
            .then(res => {
                setkq(res.data)
                console.log(typeof res)
                console.log(res.data)
                // startTimer()
            })
            .catch(err => { console.log(err); })

        // return () => { clearInterval(timer) }
    }, [])

    return (
        <View>
            <Text>{kq.data.title}</Text>
            <Text>Hello</Text>
        </View>
    )
}