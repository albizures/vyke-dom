export type HTMLElementWithDisabled =
	| HTMLButtonElement
	| HTMLInputElement
	| HTMLLinkElement
	| HTMLSelectElement
	| HTMLTextAreaElement
	| HTMLOptionElement

export let enable = (btn: HTMLElementWithDisabled) => {
	btn.disabled = false
}

export let disable = (btn: HTMLElementWithDisabled) => {
	btn.disabled = true
}
