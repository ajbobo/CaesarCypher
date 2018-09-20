import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    FULL_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    constructor(props) {
        super(props);

        this.state = {key: '', alphabet: this.calculateAlphabet('')};

        this.onChangeKey = this.onChangeKey.bind(this);
        this.calculateAlphabet = this.calculateAlphabet.bind(this);
    }

    onChangeKey(e) {
        let key = e.target.value.toUpperCase();
        let alphabet = this.calculateAlphabet(key);
        this.setState({key: key, alphabet: alphabet});
        e.preventDefault();
    }

    calculateAlphabet(key) {
        // NOTE: This uses a lot of String.concat() which instantiates new strings. Is there a better way?
        // console.log('key:' + key);
        let alphabet = '';
        for (let x = 0; x < key.length; x++) {
            let char = key.charAt(x);
            if (char !== ' ' && alphabet.indexOf(char) < 0) {
                alphabet = alphabet.concat(char);
                // console.log('alphabet:' + alphabet);
            }
        }
        for (let x = 0; x < this.FULL_ALPHABET.length; x++) {
            let char = this.FULL_ALPHABET.charAt(x);
            if (alphabet.indexOf(char) === -1) {
                alphabet = alphabet.concat(char);
                // console.log('alphabet:' + alphabet);
            }
        }
        return alphabet;
    }


    render() {
        return (
            <div>
                <h1>Caesar Cypher</h1>
                <form>
                    <label>Key: </label>
                    <input type='string' value={this.state.key} onChange={this.onChangeKey} />
                </form>
                <p>The key is {this.state.key}</p>
                <p>The alphabet is {this.state.alphabet}</p>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
