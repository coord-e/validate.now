import { h } from "hyperapp"

import editorStyles from "../css/editor.css"

export default ({text, update, label, placeholder, is_error}) => (
  <div class={`${editorStyles.container} ${is_error ? editorStyles.invalid : editorStyles.valid}`}>
    <textarea placeholder={placeholder}
              value={text}
              oninput={e => update(e.target.value)}
              class={editorStyles.editor}
            />
    <div class={editorStyles.label}>{label}</div>
  </div>
)
