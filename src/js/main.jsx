import { h, app } from "hyperapp"

import styles from "../css/style.css"

const state = {
  text: "",
}

const actions = {
  update: text => state => ({ text }),
}

const CodeEditor = ({text, update}) => (
  <textarea placeholder="code: this"
            value={text}
            oninput={e => update(e.target.value)}
          />
)

const view = (state, actions) => (
  <div>
    <main>
      <CodeEditor text={state.text} update={actions.update} />
    </main>
  </div>
)

const main = app(state, actions, view, document.body)
