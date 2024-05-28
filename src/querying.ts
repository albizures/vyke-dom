/**
 * Functions to query elements from the DOM
 * @module querying
 */
import { Err, Ok, type Result } from '@vyke/results'

export type TypeClass<TType> = {
	new (): TType
	prototype: TType
}

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
 * select all the given queries within the given element
 * @example
 * ```ts
 * import { query, selectIn } from '@vyke/dom'
 * import { unwrap } from '@vyke/results'
 *
 * const [myDiv, listItems] = unwrap(selectIn(
 * 	document.body, // <- the container
 * 	query<HTMLDivElement>('#my-div'), // type given as generic
 * 	queryAll<HTMLLIElement>('.list-item'), // type given as the class
 * 	// ^ this query will check `element instanceof HTMLLIElement
 * ))
 * ```
 * > [!NOTE]
 * > If any of the given queries return null the whole expression is considered
 * > a as failure, returning an Err
 */
export let selectIn = <TQueries extends Array<Query<unknown>>>(
	parent: ParentNode,
	...queries: TQueries
): Result<ExtraTypeFromEach<TQueries>, Error> => {
	let elements: Array<unknown> = []

	for (let query of queries) {
		let { selector, type, instance } = query
		if (type === 'one') {
			let element = parent.querySelector(selector)

			if (!element) {
				return Err(
					new Error(`Element not found with selector "${selector}"`),
				)
			}

			if (instance && !(element instanceof (instance as any))) {
				return Err(
					new Error(`Invalid selected type with selector "${selector}"`),
				)
			}

			elements.push(element)
		}
		else {
			elements.push([...parent.querySelectorAll(selector)])
		}
	}

	return Ok(elements as ExtraTypeFromEach<TQueries>)
}
/**
 * Shortcut to selectIn using document as the container
 * @example
 * ```ts
 * import { query, select, selectIn } from '@vyke/dom'
 * import { unwrap } from '@vyke/results'
 *
 * const [myDiv, listItems] = unwrap(selectIn(
 * 	document, // <- the container
 * 	query<HTMLDivElement>('#my-div'), // type given as generic
 * 	queryAll<HTMLLIElement>('.list-item'), // type given as the class
 * 	// ^ this query will check `element instanceof HTMLLIElement
 * ))
 * // both ways are equivalent
 * const [myDiv, listItems] = unwrap(select(
 * 	query<HTMLDivElement>('#my-div'), // type given as generic
 * 	queryAll<HTMLLIElement>('.list-item'), // type given as the class
 * 	// ^ this query will check `element instanceof HTMLLIElement
 * ))
 * ```
 */
export let select = <TQueries extends Array<Query<unknown>>>(
	...queries: TQueries
): Result<ExtraTypeFromEach<TQueries>, Error> => {
	return selectIn(document, ...queries)
}

/**
 * Creates a query to be used inside of select or selectIn, and return only one element
 * @example
 * ```ts
 * import { query, select } from '@vyke/dom'
 * import { unwrap } from '@vyke/results'
 *
 * unwrap(select(
 * 	query<HTMLDivElement>('#my-div'), // type given as generic
 * 	query('.list-item', HTMLLIElement), // type given as the class
 * 	// ^ this query will check `element instanceof HTMLLIElement
 * ))
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
 * import { unwrap } from '@vyke/results'
 * const [listItems] = unwrap(select(
 * //         ^? Array<HTMLLIElement>
 * 	queryAll<HTMLLIElement>('.list-item'),
 * ))
 * ```
 */
export let queryAll = <TType = never>(selector: string): Query<Array<TType>> => {
	return {
		selector,
		instance: undefined,
		type: 'all',
	}
}
