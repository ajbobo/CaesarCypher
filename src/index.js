import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    FULL_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    constructor(props) {
        super(props);

        this.state = {
            key: '',
            alphabet: this.FULL_ALPHABET,
            encryptedText: '',
            plainText: '',
        };

        this.onChangeKey = this.onChangeKey.bind(this);
        this.calculateAlphabet = this.calculateAlphabet.bind(this);
        this.onChangeEncryptedText = this.onChangeEncryptedText.bind(this);
        this.onChangePlainText = this.onChangePlainText.bind(this);
    }

    onChangeKey(e) {
        let key = e.target.value.toUpperCase();
        let alphabet = this.calculateAlphabet(key);
        this.setState({key: key, alphabet: alphabet});
        e.preventDefault();
    }

    onChangePlainText(e) {
        let plain = e.target.value.toUpperCase();
        let encrypted = App.performEncryption(plain, this.FULL_ALPHABET, this.state.alphabet);
        this.setState({plainText: plain, encryptedText: encrypted});
        e.preventDefault();
    }

    onChangeEncryptedText(e) {
        let encrypted = e.target.value.toUpperCase();
        let plain = App.performEncryption(encrypted, this.state.alphabet, this.FULL_ALPHABET);
        this.setState({plainText: plain, encryptedText: encrypted});
        e.preventDefault();
    }

    static performEncryption(message, starting_alphabet, target_alphabet) {
        let conversions = {};
        for (let x = 0; x < starting_alphabet.length; x++) {
            conversions[starting_alphabet.charAt(x)] = target_alphabet.charAt(x);
        }
        // console.log(conversions);

        let res = '';
        for (let x = 0; x < message.length; x++) {
            let char1 = message.charAt(x);
            let char2 = (conversions.hasOwnProperty(char1) ? conversions[char1] : char1);
            // console.log(char1 + " -> " + char2);
            res = res.concat(char2);
        }

        return res;
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
                    <input type='string' value={this.state.key} onChange={this.onChangeKey}/>
                </form>
                <p>The key is {this.state.key}</p>
                <p>The alphabet is {this.state.alphabet}</p>
                <form>
                    Plaintext
                    <textarea value={this.state.plainText} onChange={this.onChangePlainText} rows='6' cols='50'/>
                    Encrypted
                    <textarea value={this.state.encryptedText} onChange={this.onChangeEncryptedText} rows='6' cols='50'/>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
