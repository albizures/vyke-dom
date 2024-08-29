// @vitest-environment jsdom
import { assertType, describe, expect, it } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { query, queryAll, select } from './querying'

expect.extend(matchers as any)

it('should select the elements matching given elements ', () => {
	document.body.innerHTML = `
	<div id="my-div">my div</div>
	<ul class="list">
		<li class="list-item">item 1</li>
		<li class="list-item">item 2</li>
		<li class="list-item">item 2</li>
	</ul>
`

	const [myDiv, oneItem, allItems] = select(
		query<HTMLDivElement>('#my-div'),
		query<HTMLLIElement>('.list-item'),
		queryAll<HTMLLIElement>('.list-item'),
	)

	assertType<HTMLDivElement>(myDiv)
	expect(myDiv).toHaveTextContent('my div')
	expect(myDiv).toBeInstanceOf(HTMLDivElement)

	assertType<HTMLLIElement>(oneItem)
	expect(oneItem).toBeInstanceOf(HTMLLIElement)

	assertType<Array<HTMLLIElement>>(allItems)
	expect(Array.isArray(allItems)).toBe(true)
	expect(allItems.length).toBe(3)
})

describe('when any of the given queries fail', () => {
	it('should return an undefined', () => {
		document.body.innerHTML = `
		<div id="my-div">my div</div>
		<ul class="list">
			<li class="list-item">item 1</li>
			<li class="list-item">item 2</li>
			<li class="list-item">item 2</li>
		</ul>
	`

		const [myDiv, listTypo, listItem] = select(
			query<HTMLDivElement>('#my-div'),
			query<HTMLLIElement>('.list-typo'),
			queryAll('.list-item'),
		)

		expect(myDiv).toBeInstanceOf(HTMLDivElement)
		expect(listTypo).toBe(undefined)
		expect(listItem).toEqual([
			expect.any(HTMLLIElement),
			expect.any(HTMLLIElement),
			expect.any(HTMLLIElement),
		])
	})
})

describe('when a class constructor is given', () => {
	it('should check the type', () => {
		document.body.innerHTML = `
		<div id="my-div">my div</div>
		<ul class="list">
			<li class="list-item">item 1</li>
			<li class="list-item">item 2</li>
			<li class="list-item">item 2</li>
		</ul>
	`

		const [myDiv] = select(
			query('#my-div', HTMLDivElement),
		)

		assertType<HTMLDivElement>(myDiv)
		expect(myDiv).toHaveTextContent('my div')
		expect(myDiv).toBeInstanceOf(HTMLDivElement)

		const [list] = select(
			query('.list', HTMLDivElement),
		)

		expect(list).toBe(undefined)
	})
})
