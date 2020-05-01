import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'

import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import CusButton from '../components/CusButton'

const StartGame = props => {

  const [enteredValue, setEnteredValue] = useState('')

  const [confirmed, setConfirmed] = useState(false)

  const [selectedNumber, setSelectedNumber] = useState()

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  }

  function dismiss () {
    Keyboard.dismiss()
  }

  function start () {
    props.onStartGame(selectedNumber)
  }

  const resetInputHandler = () => {
    setEnteredValue('')
    setConfirmed(false)
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue)
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to be between 1 & 99', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
      return
    }
    setConfirmed(true)
    setSelectedNumber(chosenNumber)
    setEnteredValue('')
    Keyboard.dismiss()
  }

  let confirmedOutput

  if (confirmed) {
    confirmedOutput = <Card style={styles.summary}>
                        <BodyText>
                          You Selected
                        </BodyText>
                        <NumberContainer>
                          {selectedNumber}
                        </NumberContainer>
      <CusButton onPress={start} >START GAME</CusButton>
                      </Card>
  }

  return (
    <TouchableWithoutFeedback onPress={dismiss}>
      <View style={styles.screen}>
        <Text style={styles.title}>
          Start a New Game
        </Text>
        <Card style={styles.cardInput}>
          <BodyText style={styles.text}>
            Select a Number
          </BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue} />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title='Reset' onPress={resetInputHandler} color={Colors.accent} />
            </View>
            <View style={styles.button}>
              <Button title='Confirm' onPress={confirmInputHandler} color={Colors.primary} />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'

  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'OpenSans-Bold'

  },
  cardInput: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center'

  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 80
  },
  input: {
    width: 50,
    textAlign: 'center',
    height: 35
  },
  summary: {
    marginTop: 20,
    alignItems: 'center'
  },
  text: {
    fontFamily: 'OpenSans-Bold'
  }
})

export default StartGame
