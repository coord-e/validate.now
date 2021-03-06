import { h, app } from "hyperapp"

import styles from "../css/style.css"
import editorStyles from "../css/editor.css"

import CodeEditor from "./CodeEditor.jsx"
import ErrorBox from "./ErrorBox.jsx"

import Ajv from 'ajv'
import YAML from 'yamljs'

const ajv = new Ajv({$data: true})

const schemaFromURI = decodeURIComponent(location.pathname.substring(1))
const isSchemaHidden = location.search.substring(1).includes('schema_hidden')

const state = {
  data: schemaFromURI ? '' : `string: string
integer: 10
array:
  - 1
  - 2
  - 3`,
  schema: schemaFromURI || `type: object
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
  schema_error: false,
  schema_hidden: isSchemaHidden
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
  update_schema: text => state =>{
    history.replaceState({schema: text}, null, `/${encodeURIComponent(text)}`)
    return { schema: text }
  },
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
  },
  toggle_hide: () => state => {
    history.replaceState({hidden: !state.schema_hidden}, null, `${location.pathname}${state.schema_hidden ? '' : '?schema_hidden'}`)
    return {schema_hidden: !state.schema_hidden}
  }
}

const view = (state, actions) => (
  <main class={styles.main} oncreate={actions.validate}>
    <div class={editorStyles.area}>
      <CodeEditor label="DATA" text={state.data} is_error={state.data_error} placeholder="Input data..." update={value => {
                                              actions.update_data(value);
                                              actions.validate();
                                              }} />
      {
        state.schema_hidden || <CodeEditor label="SCHEMA" text={state.schema} is_error={state.schema_error} placeholder="Input schema..." update={value => {
                                                actions.update_schema(value);
                                                actions.validate();
                                                }} />
      }
    </div>
    <ErrorBox error={state.errors} toggle_hide={actions.toggle_hide} hidden={state.schema_hidden}/>
  </main>
)

const main = app(state, actions, view, document.body)
