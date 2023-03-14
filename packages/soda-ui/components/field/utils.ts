/* eslint-disable @typescript-eslint/no-non-null-assertion */
export function startComposing({ target }: Event) {
  target!.composing = true
}
export function endComposing({ target }: Event) {
  if (target!.composing) {
    target!.composing = false
    target!.dispatchEvent(new Event('input'))
  }
}
