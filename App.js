/* @flow */

import React, { Component, useState } from 'react'

import { View, Text, StyleSheet, TextInput, Button, ScrollView, FlatList } from 'react-native'

import Header from './components/Header'
import StartGame from './screens/StartGame'
import GameScreen from './screens/GameScreen'
import GameOver from './screens/GameOver'

// export default class App extends Component {
const App = () => {
  // render () {
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)

  const newGameHandler = () => {
    setGuessRounds(0)
    setUserNumber(null)
  }

  const StartGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds)
  }

  let content = <StartGame onStartGame={StartGameHandler} />
  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  }else if (guessRounds > 0) {
    content = <GameOver roundsNumber={guessRounds} userNumber={userNumber} onRestart={newGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title='Guess A Number' />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})

export default App
