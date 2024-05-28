/**
 * Fuctions to enable and disable HTML elements
 * @module inputs
 */

export type HTMLElementWithDisabled =
	| HTMLButtonElement
	| HTMLInputElement
	| HTMLLinkElement
	| HTMLSelectElement
	| HTMLTextAreaElement
	| HTMLOptionElement

/**
 * Enable an element
 */
export let enable = (btn: HTMLElementWithDisabled) => {
	btn.disabled = false
}

/**
 * Disable an element
 */
export let disable = (btn: HTMLElementWithDisabled) => {
	btn.disabled = true
}
