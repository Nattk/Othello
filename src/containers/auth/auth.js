import React from 'react'
import './auth.scss'
import axios from 'axios'

class Auth extends React.Component {
    state = {
      endpoint: 'http://localhost:4001',
      username: '',
      password: ''
    }

    login = () => {
      axios.post(`${this.state.endpoint}/login`, { username: this.state.username, password: this.state.password })
        .then(user => {
          console.log(user)
          localStorage.setItem('userId', user.data)
          this.props.history.push('/list')
        })
        .catch(err => {
          console.log(err)
        })
    }

    signUp = () => {
      axios.post(`${this.state.endpoint}/signup`, { username: this.state.username, password: this.state.password })
        .then(user => {
          localStorage.setItem('userId', user.data)
          this.props.history.push('/list')
        })
        .catch(err => {
          console.log(err)
        })
    }

    change = (event) => {
      if (event.target.name === 'password') {
        this.setState({ password: event.target.value })
      } else {
        this.setState({ username: event.target.value })
      }
    }

    render () {
      return (
        <article className="auth">
          <h1 className="align-self-center">Othello MultiPLayer</h1>
          <div className="input-wrapper">
            <section className="form">
              <h2>Inscription</h2>
              <form>
                <label htmlFor='username'>Nom d&apos;utilisateur</label>
                <input id="username" type="text" placeholder="username" name="username" onChange={(event) => this.change(event)}/>
                <label htmlFor='password'>Mot de passe</label>
                <input id="password" type="password" placeholder="Mot de passe" name="password" onChange={(event) => this.change(event)}/>
              </form>
              <button onClick={this.signUp}>Inscription</button>
            </section>
            <section>
              <h2>Connexion</h2>
              <form>
                <label htmlFor='username'>Nom d&apos;utilisateur</label>
                <input id="username" type="text" placeholder="username" name="username" onChange={(event) => this.change(event)}/>
                <label htmlFor='password'>Mot de passe</label>
                <input id="password" type="password" name="password" placeholder="Mot de passe" onChange={(event) => this.change(event)}/>
              </form>
              <button onClick={this.login}>Connexion</button>

            </section>
          </div>
        </article>

      )
    }
}

export default Auth
