import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'

import CusButton from '../components/CusButton'
const GameOver = props => {

  return (
    <View style={styles.screen}>
      <Text>
        Game Over
      </Text>
      <View style={styles.imageContain}>
        <Image source={require('../assets/success.png')} style={styles.image} />
      </View>
      <Text>
        Number of Rounds:
        {props.roundsNumber}
      </Text>
      <Text>
        Number was:
        {props.userNumber}
      </Text>
      <CusButton onPress={props.onRestart}>
        NEW GAME
      </CusButton>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'

  },
  imageContain: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 0,
    overflow: 'hidden',
    marginVertical: 30

  }
})

export default GameOver
