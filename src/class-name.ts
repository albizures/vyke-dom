/**
 * Helper functions for managing classes from an element.
 * @module class-name
 */

export let removeClass = (element: HTMLElement, className: string): void => {
	element.classList.remove(className)
}
export let addClass = (element: HTMLElement, className: string): void => {
	element.classList.add(className)
}
