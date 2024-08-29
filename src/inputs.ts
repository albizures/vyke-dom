/**
 * Functions to enable and disable HTML elements
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
export let enable = (btn: HTMLElementWithDisabled): void => {
	btn.disabled = false
}

/**
 * Disable an element
 */
export let disable = (btn: HTMLElementWithDisabled): void => {
	btn.disabled = true
}
