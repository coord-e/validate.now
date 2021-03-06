import { h } from "hyperapp"

import errorStyles from "../css/error.css"

export default ({error, text="Valid!", toggle_hide, hidden}) => (
  <div>
    <div class={errorStyles.container}>
      {
        error
          ? <textarea readonly class={errorStyles.view}>{JSON.stringify(error, undefined, 2)}</textarea>
          : <div>
            <span class={errorStyles.valid}>{text}</span>
          </div>
      }
    </div>
    <a href="https://github.com/coord-e/validate.now" class={errorStyles.github} target="_blank">GitHub</a>
    <button class={errorStyles.toggle} onclick={toggle_hide}>{hidden ? "Show" : "Hide"} schema</button>
  </div>
)
