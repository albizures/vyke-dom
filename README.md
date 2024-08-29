<div align="center">
	<h1>
		@vyke/dom
	</h1>
</div>
Functional and tiny (<1kb) functions to query and handle the dom in a safe and easy way and TypeScript friendly.

## Installation
```sh
npm i @vyke/dom
```

## Examples
```ts
import { query, select } from '@vyke/dom'

const [app] = select(
	query<HTMLDivElement>('#app'),
)

console.log(app)
//           ^? HTMLDivElement
```

Querying inside an specific element
```ts
import { query, selectIn } from '@vyke/dom'

const [submitBtn] = selectIn(
	form,
	query<HTMLButtonElement>('#submit'),
)

console.log(submitBtn)
//             ^? HTMLButtonElement
```

## API
### find
Find an element within the parent

### findAll
Find all elements within the parent

### selectIn
select all the given queries within the given element

```ts
import { query, selectIn } from '@vyke/dom'

const [myDiv, listItems] = selectIn(
	document.body, // <- the container
	query<HTMLDivElement>('#my-div'), // type given as generic
	queryAll<HTMLLIElement>('.list-item'), // type given as the class
	// ^ this query will check `element instanceof HTMLLIElement
)
```
> [!NOTE]
> If any of the given queries return `null`, the result will be `undefined`

### select
Shortcut to selectIn using document as the container

```ts
import { query, select, selectIn } from '@vyke/dom'

const [myDiv, listItems] = selectIn(
	document, // <- the container
	query<HTMLDivElement>('#my-div'), // type given as generic
	queryAll<HTMLLIElement>('.list-item'), // type given as the class
	// ^ this query will check `element instanceof HTMLLIElement
)
// both ways are equivalent
const [myDiv, listItems] = select(
	query<HTMLDivElement>('#my-div'), // type given as generic
	queryAll<HTMLLIElement>('.list-item'), // type given as the class
	// ^ this query will check `element instanceof HTMLLIElement
)
```

### query
Creates a query to be used inside of select or selectIn, and return only one element

```ts
import { query, select } from '@vyke/dom'

select(
	query<HTMLDivElement>('#my-div'), // type given as generic
	query('.list-item', HTMLLIElement), // type given as the class
	// ^ this query will check `element instanceof HTMLLIElement
)
```

### queryAll
Similar to `query` but return an array of elements

```ts
import { query, select } from '@vyke/dom'
const [listItems] = select(
//         ^? Array<HTMLLIElement>
	queryAll<HTMLLIElement>('.list-item'),
)
```

### removeClass
Helper functions for managing classes from an element.

### enable
Enable an element

### disable
Disable an element

### on
Add an event listener to a target

```ts
const button = document.createElement('button')
on(button, 'click', () => console.log('clicked'))
```

### on
Add an event listener to a target

```ts
const button = document.createElement('button')
on(button, 'click', () => console.log('clicked'))
```

### on
Add an event listener to a target

```ts
const button = document.createElement('button')
on(button, 'click', () => console.log('clicked'))
```

### off
Remove an event listener from a target

```ts
const button = document.createElement('button')
const handler = () => console.log('clicked')
on(button, 'click', handler)
off(button, 'click', handler)
```

### off
Remove an event listener from a target

```ts
const button = document.createElement('button')
const handler = () => console.log('clicked')
on(button, 'click', handler)
off(button, 'click', handler)
```

### off
Remove an event listener from a target

```ts
const button = document.createElement('button')
const handler = () => console.log('clicked')
on(button, 'click', handler)
off(button, 'click', handler)
```

### isInput
Check if the element is an input element

### isElement
Check if the element is a html element

## Others vyke projects
- [Flowmodoro app by vyke](https://github.com/albizures/vyke-flowmodoro)
- [@vyke/results](https://github.com/albizures/vyke-results)
- [@vyke/val](https://github.com/albizures/vyke-val)
- [@vyke/tsdocs](https://github.com/albizures/vyke-tsdocs)
