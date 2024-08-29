/**
 * Functions to query elements from the DOM
 * @module querying
 */

import type { TypeClass } from './utils'

export type QueryType = 'one' | 'all'

export type Query<TType> = {
	selector: string
	type: QueryType
	instance?: TypeClass<TType>
}

export type ExtraTypeFrom<TQuery> = TQuery extends Query<infer TType> ? TType : never
export type ExtraTypeFromEach<TQueries> = TQueries extends [
	infer THead,
	...infer TTail,
]
	? [ExtraTypeFrom<THead>, ...ExtraTypeFromEach<TTail>]
	: TQueries extends [infer THead]
		? [ExtraTypeFrom<THead>]
		: []

/**
 * Find an element within the parent
 */
export let find = (parent: ParentNode, selector: string): Element | undefined => {
	return parent.querySelector(selector) ?? undefined
}

/**
 * Find all elements within the parent
 */
export let findAll = (parent: ParentNode, selector: string): NodeListOf<Element> => {
	return parent.querySelectorAll(selector)
}

/**
 * select all the given queries within the given element
 * @example
 * ```ts
 * import { query, selectIn } from '@vyke/dom'
 *
 * const [myDiv, listItems] = selectIn(
 * 	document.body, // <- the container
 * 	query<HTMLDivElement>('#my-div'), // type given as generic
 * 	queryAll<HTMLLIElement>('.list-item'), // type given as the class
 * 	// ^ this query will check `element instanceof HTMLLIElement
 * )
 * ```
 * > [!NOTE]
 * > If any of the given queries return `null`, the result will be `undefined`
 */
export let selectIn = <TQueries extends Array<Query<unknown>>>(
	parent: ParentNode,
	...queries: TQueries
): ExtraTypeFromEach<TQueries> => {
	let elements: Array<unknown> = []

	for (let query of queries) {
		let { selector, type, instance } = query
		if (type === 'one') {
			let element = find(parent, selector) ?? undefined

			if (instance && !(element instanceof (instance as any))) {
				elements.push(undefined)
			}
			else {
				elements.push(element)
			}
		}
		else {
			elements.push([...findAll(parent, selector)])
		}
	}

	return elements as ExtraTypeFromEach<TQueries>
}
/**
 * Shortcut to selectIn using document as the container
 * @example
 * ```ts
 * import { query, select, selectIn } from '@vyke/dom'
 *
 * const [myDiv, listItems] = selectIn(
 * 	document, // <- the container
 * 	query<HTMLDivElement>('#my-div'), // type given as generic
 * 	queryAll<HTMLLIElement>('.list-item'), // type given as the class
 * 	// ^ this query will check `element instanceof HTMLLIElement
 * )
 * // both ways are equivalent
 * const [myDiv, listItems] = select(
 * 	query<HTMLDivElement>('#my-div'), // type given as generic
 * 	queryAll<HTMLLIElement>('.list-item'), // type given as the class
 * 	// ^ this query will check `element instanceof HTMLLIElement
 * )
 * ```
 */
export let select = <TQueries extends Array<Query<unknown>>>(
	...queries: TQueries
): ExtraTypeFromEach<TQueries> => {
	return selectIn(document, ...queries)
}

/**
 * Creates a query to be used inside of select or selectIn, and return only one element
 * @example
 * ```ts
 * import { query, select } from '@vyke/dom'
 *
 * select(
 * 	query<HTMLDivElement>('#my-div'), // type given as generic
 * 	query('.list-item', HTMLLIElement), // type given as the class
 * 	// ^ this query will check `element instanceof HTMLLIElement
 * )
 * ```
 */
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

/**
 * Similar to `query` but return an array of elements
 * @example
 * ```ts
 * import { query, select } from '@vyke/dom'
 * const [listItems] = select(
 * //         ^? Array<HTMLLIElement>
 * 	queryAll<HTMLLIElement>('.list-item'),
 * )
 * ```
 */
export let queryAll = <TType = Element>(selector: string): Query<Array<TType>> => {
	return {
		selector,
		instance: undefined,
		type: 'all',
	}
}
