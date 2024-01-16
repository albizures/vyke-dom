import { Err, Ok, type Result } from '@vyke/results'

type TypeClass<TType> = {
	new (): TType
	prototype: TType
}

export type Query<TType> = {
	selector: string
	type: 'one' | 'all'
	instance: TypeClass<TType> | undefined
}

type ExtraTypeFrom<TQuery> = TQuery extends Query<infer TType> ? TType : never
type ExtraTypeFromEach<TQueries> = TQueries extends [
	infer THead,
	...infer TTail,
]
	? [ExtraTypeFrom<THead>, ...ExtraTypeFromEach<TTail>]
	: TQueries extends [infer THead]
		? [ExtraTypeFrom<THead>]
		: []

export function query<TType>(
	selector: string,
	instance?: TypeClass<TType>,
): Query<TType> {
	return {
		selector,
		instance,
		type: 'one',
	}
}

export function queryAll<TType = never>(selector: string): Query<Array<TType>> {
	return {
		selector,
		instance: undefined,
		type: 'all',
	}
}

export function selectAnyIn<TQueries extends Array<Query<unknown>>>(
	parent: ParentNode,
	...queries: TQueries
): Result<ExtraTypeFromEach<TQueries>, Error> {
	const elements: Array<unknown> = []

	for (const query of queries) {
		if (query.type === 'one') {
			const element = parent.querySelector(query.selector)

			if (!element) {
				elements.push(element)
				continue
			}

			if (query.instance && !(element instanceof (query.instance as any))) {
				return Err(
					new Error(`Invalid selected type with selector "${query.selector}"`),
				)
			}

			elements.push(element)
		}
		else {
			elements.push([...document.querySelectorAll(query.selector)])
		}
	}

	return Ok(elements as ExtraTypeFromEach<TQueries>)
}

export function selectIn<TQueries extends Array<Query<unknown>>>(
	parent: ParentNode,
	...queries: TQueries
): Result<ExtraTypeFromEach<TQueries>, Error> {
	const elements: Array<unknown> = []

	for (const query of queries) {
		if (query.type === 'one') {
			const element = parent.querySelector(query.selector)

			if (!element) {
				return Err(
					new Error(`Element not found with selector "${query.selector}"`),
				)
			}

			if (query.instance && !(element instanceof (query.instance as any))) {
				return Err(
					new Error(`Invalid selected type with selector "${query.selector}"`),
				)
			}

			elements.push(element)
		}
		else {
			elements.push([...document.querySelectorAll(query.selector)])
		}
	}

	return Ok(elements as ExtraTypeFromEach<TQueries>)
}

export function select<TQueries extends Array<Query<unknown>>>(
	...queries: TQueries
): Result<ExtraTypeFromEach<TQueries>, Error> {
	return selectIn(document, ...queries)
}

export function removeClass(element: HTMLElement, className: string) {
	element.classList.remove(className)
}
export function addClass(element: HTMLElement, className: string) {
	element.classList.add(className)
}

type HTMLElementWithDisabled =
	| HTMLButtonElement
	| HTMLInputElement
	| HTMLLinkElement
	| HTMLSelectElement
	| HTMLTextAreaElement
	| HTMLOptionElement

export function enable(btn: HTMLElementWithDisabled) {
	btn.disabled = false
}

export function disable(btn: HTMLElementWithDisabled) {
	btn.disabled = true
}
