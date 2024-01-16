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

export let query = <TType>(
	selector: string,
	instance?: TypeClass<TType>,
): Query<TType> => {
	return {
		selector,
		instance,
		type: 'one',
	}
}

export let queryAll = <TType = never>(selector: string): Query<Array<TType>> => {
	return {
		selector,
		instance: undefined,
		type: 'all',
	}
}

export let selectIn = <TQueries extends Array<Query<unknown>>>(
	parent: ParentNode,
	...queries: TQueries
): Result<ExtraTypeFromEach<TQueries>, Error> => {
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

export let select = <TQueries extends Array<Query<unknown>>>(
	...queries: TQueries
): Result<ExtraTypeFromEach<TQueries>, Error> => {
	return selectIn(document, ...queries)
}

export let removeClass = (element: HTMLElement, className: string) => {
	element.classList.remove(className)
}
export let addClass = (element: HTMLElement, className: string) => {
	element.classList.add(className)
}

type HTMLElementWithDisabled =
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
