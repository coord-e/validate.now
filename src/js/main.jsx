import { h, app } from "hyperapp"

import styles from "../css/style.css"
import editorStyles from "../css/editor.css"
import errorStyles from "../css/error.css"

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

const CodeEditor = ({text, update, placeholder}) => (
  <textarea placeholder={placeholder}
            value={text}
            oninput={e => update(e.target.value)}
            class={editorStyles.editor}
          />
)

const ErrorBox = ({error, text="Valid!"}) => (
  <div class={errorStyles.container}>
    {
      error
        ? <textarea readonly class={errorStyles.view}>{JSON.stringify(error, undefined, 2)}</textarea>
        : <span class={errorStyles.valid}>{text}</span>
    }
  </div>
)

const view = (state, actions) => (
  <main class={styles.main}>
    <div class={editorStyles.container}>
      <CodeEditor text={state.data} placeholder="Input data..." update={value => {
                                              actions.update_data(value);
                                              actions.validate();
                                              }} />
      <CodeEditor text={state.schema} placeholder="Input schema..." update={value => {
                                              actions.update_schema(value);
                                              actions.validate();
                                              }} />
    </div>
    <ErrorBox error={state.errors} />
  </main>
)

const main = app(state, actions, view, document.body)
