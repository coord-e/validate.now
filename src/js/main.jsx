import { h, app } from "hyperapp"

import styles from "../css/style.css"
import editorStyles from "../css/editor.css"
import errorStyles from "../css/error.css"

import Ajv from 'ajv'
import YAML from 'yamljs'

const ajv = new Ajv({$data: true})

const state = {
  data: `string: string
integer: 10
array:
  - 1
  - 2
  - 3`,
  schema: `type: object
required:
  - string
properties:
  string:
    type: string
  integer:
    type: integer
  array:
    type: array
    items:
      type: integer`,
  data_error: false,
  schema_error: false
}

const getYAML = (str) => {
  try{
    return YAML.parse(str)
  }catch(e){
    return null
  }
}

const getJSON = (str) => {
  try{
    return JSON.parse(str)
  }catch(e){
    return null
  }
}

const load = (str) => {
  let data
  if(data = getJSON(str))
    return data
  if(data = getYAML(str))
    return data
  return null
}


const actions = {
  update_schema: text => state => ({ schema: text }),
  update_data: text => state => ({ data: text }),
  validate: () => state => {
    const data = load(state.data)
    if(!data)
      return { data_error: true, errors: "Failed to load data: data is not json or yaml" }

    const schema = load(state.schema)
    if(!schema)
      return { schema_error: true, errors: "Failed to load schema: schema is not json or yaml" }

    let result;
    try{
      result = ajv.validate(schema, data)
    }catch(e){
      return { schema_error: true, errors: e.message }
    }
    return { data_error: !result, schema_error: false, errors: ajv.errors }
  }
}

const CodeEditor = ({text, update, style, label, placeholder}) => (
  <div class={`${editorStyles.container} ${style}`}>
    <textarea placeholder={placeholder}
              value={text}
              oninput={e => update(e.target.value)}
              class={editorStyles.editor}
            />
    <div class={editorStyles.label}>{label}</div>
  </div>
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
    <div class={editorStyles.area}>
      <CodeEditor label="DATA" text={state.data} style={state.data_error ? editorStyles.invalid : editorStyles.valid} placeholder="Input data..." update={value => {
                                              actions.update_data(value);
                                              actions.validate();
                                              }} />
      <CodeEditor label="SCHEMA" text={state.schema} style={state.schema_error ? editorStyles.invalid : editorStyles.valid} placeholder="Input schema..." update={value => {
                                              actions.update_schema(value);
                                              actions.validate();
                                              }} />
    </div>
    <ErrorBox error={state.errors} />
  </main>
)

const main = app(state, actions, view, document.body)
