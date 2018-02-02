import { h } from "hyperapp"

import errorStyles from "../css/error.css"

export default ({error, text="Valid!", toggle_hide}) => (
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
    <button class={errorStyles.toggle} onclick={toggle_hide}>Hide/Show schema</button>
  </div>
)
