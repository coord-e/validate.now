import { h, app } from "hyperapp"

import styles from "../css/style.css"

import Ajv from 'ajv'
import YAML from 'yamljs'

const ajv = new Ajv({$data: true})

const state = {
  data: "",
  schema: "",
}

const actions = {
  update_schema: text => state => ({ schema: text }),
  update_data: text => state => ({ data: text }),
  validate: () => state => {
    const data = YAML.parse(state.data)
    const schema = YAML.parse(state.schema)
    const result = ajv.validate(schema, data)
    if(!result)
      console.error(`Vaildation error: ${ajv.errors}`)
    return { errors: ajv.errors }
  }
}

const CodeEditor = ({text, update}) => (
  <textarea placeholder="code: this"
            value={text}
            oninput={e => update(e.target.value)}
            class={styles.editor}
          />
)

const view = (state, actions) => (
  <div>
    <main>
      <CodeEditor text={state.data} update={value => {
                                              actions.update_data(value);
                                              actions.validate();
                                              }} />
      <CodeEditor text={state.schema} update={value => {
                                              actions.update_schema(value);
                                              actions.validate();
                                              }} />
      {state.errors && <pre class={styles.errorbox}>{JSON.stringify(state.errors, undefined, 2)}</pre>}
    </main>
  </div>
)

const main = app(state, actions, view, document.body)
