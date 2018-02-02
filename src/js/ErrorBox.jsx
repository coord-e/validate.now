import { h } from "hyperapp"

import errorStyles from "../css/error.css"

export default ({error, text="Valid!"}) => (
  <div class={errorStyles.container}>
    {
      error
        ? <textarea readonly class={errorStyles.view}>{JSON.stringify(error, undefined, 2)}</textarea>
        : <span class={errorStyles.valid}>{text}</span>
    }
  </div>
)
