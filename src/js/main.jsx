import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"

import styles from "../css/style.css"

const Home = () => <h2>Hom</h2>
const About = () => <h2>About</h2>

const state = {
  count: 0,
  location: location.state
}

const actions = {
  down: () => state => ({ count: state.count - 1 }),
  up: () => state => ({ count: state.count + 1 }),
  location: location.actions
}

const view = (state, actions) => (
  <div>
    <header>
      <ul>
          <li>
            <Link to="/">Hom</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
    </header>
    <main>
      <h1 class={state.count > 10 ? styles.title : ""}>{state.count}</h1>
      <button onclick={actions.down}>-</button>
      <button onclick={actions.up}>+</button>
    </main>
    <Route path="/" render={Home} />
    <Route path="/about" render={About} />
  </div>
)

const main = app(state, actions, view, document.body)

const unsubscribe = location.subscribe(main.location)
