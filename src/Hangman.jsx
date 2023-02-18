import React, { Component } from 'react'
import './Hangman.css'
// import img0 from "/src/assets/pictures/"
import img0 from "../src/assets/pictures/0.jpg"
import img1 from "../src/assets/pictures/1.jpg"
import img2 from "../src/assets/pictures/2.jpg"
import img3 from "../src/assets/pictures/3.jpg"
import img4 from "../src/assets/pictures/4.jpg"
import img5 from "../src/assets/pictures/5.jpg"
import img6 from "../src/assets/pictures/6.jpg"
import { randomWord } from './words.jsx'

class Hangman extends Component {
	static defaultProps = {
		images: [img0, img1, img2, img3, img3, img4, img5, img6],
		maxWrong: 6
	}
	constructor(props) {
		super(props)
		this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() }
		this.handleGuess = this.handleGuess.bind(this)
		this.restart = this.restart.bind(this)
	}

	handleGuess(e) {
		let ltr = e.target.value
		this.setState((st) => ({
			guessed: st.guessed.add(ltr),
			nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
		}))
	}

	guessedWord() {
		return this.state.answer.split("").map((ltr) => (this.state.guessed.has(ltr) ? ltr : '_'))
		// ["t", "a", "b", "a", "k"]
	}
	generateButtons() {
		// return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
		return "abcçdefgğhıijklmnoöpqrsştuüvwxyz".split('').map((ltr) => (
			<button key={ltr} value={ltr} onClick={this.handleGuess} disabled={this.state.guessed.has(ltr)} > {ltr} </button>
		))
		// abcçdefgğhıijklmnoöpqrsştuüvwxyz
	}
	restart() {
		this.setState({
			nWrong: 0,
			guessed: new Set(),
			answer: randomWord(),
		})
	}
	render() {
		let gameOver = this.state.nWrong >= this.props.maxWrong
		const altText = `Tahmin sayacı, ${this.state.nWrong}/${this.props.maxWrong}`
		let isWinner = this.guessedWord().join("") === this.state.answer
		let gameState = this.generateButtons()
		if (gameOver) gameState = "Üzgünüm adam idam edildi ! "
		if (isWinner) gameState = "Tebrikler Diğer Kelimeye Geçebilirsiniz ! "
		return (
			<div className='Hangman'>
				<h1>Man hanging game</h1>
				<img src={this.props.images[this.state.nWrong]} alt={altText} />
				<p className='Hangman-wrong'>Tahmin sayacı: {this.state.nWrong}</p>
				{/* <p className='Hangman-word'> {this.guessedWord()} </p> */}
				<p className='Hangman-word'>
					{!gameOver ? this.guessedWord() : this.state.answer}
				</p>
				<p className='Hangman-btns'> {gameState} </p>
				<button id='restart' onClick={this.restart}>Yeni Kelime Al!</button>
				<p className='Hangman-answer'>
					Aranan cevap : {this.state.answer}
				</p>
			</div>
		)
	}
}


export default Hangman