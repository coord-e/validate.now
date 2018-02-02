import { h } from "hyperapp"

import editorStyles from "../css/editor.css"

export default ({text, update, style, label, placeholder}) => (
  <div class={`${editorStyles.container} ${style}`}>
    <textarea placeholder={placeholder}
              value={text}
              oninput={e => update(e.target.value)}
              class={editorStyles.editor}
            />
    <div class={editorStyles.label}>{label}</div>
  </div>
)
