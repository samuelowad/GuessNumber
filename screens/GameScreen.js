import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert, Image, ScrollView } from 'react-native'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import CusButton from '../components/CusButton'

const generateRandom = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  if (rndNum === exclude) {
    return generateRandom(min, max, exclude)
  }else {
    return rndNum
  }
}

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <Text>
      #
      {numOfRound}
    </Text>
    <Text>
      {value}
    </Text>
  </View>
)

const GameScreen = props => {
  const initialGuess = generateRandom(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuesses, setPastGuesses] = useState([initialGuess])
  const currentLow = useRef(1)
  const currentHight = useRef(100)

  const {userChoice, onGameOver} = props

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert(`Don't give false hint`, 'This is wrong...', [{text: 'Sorry', style: 'cancel'}])
      return
    }
    if (direction === 'lower') {
      currentHight.current = currentGuess
      // generateRandom(1)

    }else {
      currentLow.current = currentGuess + 1
    }
    const nextNumber = generateRandom(currentLow.current, currentHight.current, currentGuess)
    setCurrentGuess(nextNumber)
    // setRounds(curRounds => curRounds + 1)
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
  }

  return (
    <View style={styles.screen}>
      <Text>
        opponent's Guess
      </Text>
      <NumberContainer>
        {currentGuess}
      </NumberContainer>
      <Card style={styles.buttonContainer}>
        <CusButton onPress={nextGuessHandler.bind(this, 'lower')}>
          LOWER
        </CusButton>
        <CusButton onPress={nextGuessHandler.bind(this, 'greater')}>
          HIGHER
        </CusButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: 400,
    maxWidth: '90%'
  },
  listItem: {
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width:'60%'

  },
  listContainer: {
    flex: 1,
    width: '80%'
  },
  list:{
    alignItems:'center',
    justifyContent:'flex-end',
    flexGrow:1
  }
})

export default GameScreen
