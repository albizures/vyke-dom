/**
 * Collection of guards to check the type of elements
 * @module guards
 */

/**
 * Check if the element is an input element
 */
export function isInput(element: unknown): element is HTMLInputElement {
	return element instanceof HTMLInputElement
}

/**
 * Check if the element is a html element
 */
export function isElement(element: unknown): element is HTMLElement {
	return element instanceof HTMLElement
}

export function isSelect(element: unknown): element is HTMLSelectElement {
	return element instanceof HTMLSelectElement
}

export function isTextArea(element: unknown): element is HTMLTextAreaElement {
	return element instanceof HTMLTextAreaElement
}

export function isField(element: unknown): element is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement {
	return isSelect(element) || isInput(element) || isTextArea(element)
}
