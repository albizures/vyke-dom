<div align="center">
	<h1>
		@vyke/dom
	</h1>
</div>
Functional and tiny (<1kb) functions to query and handle the dom in a safe and easy way and TypeScript friendly.

## Installation
```sh
# @vyke/results is a peer dependency
npm i @vyke/dom @vyke/results
```

## Examples
```ts
import { r } from '@vyke/results/r'
import { query, select } from '@vyke/dom'

const [app] = r.unwrap(select(
	query<HTMLDivElement>('#app'),
))

console.log(app)
//           ^? HTMLDivElement
```

Querying inside an specific element
```ts
import { r } from '@vyke/results/r'
import { query, selectIn } from '@vyke/dom'

const [submitBtn] = r.unwrap(selectIn(
	form,
	query<HTMLButtonElement>('#submit'),
))

console.log(submitBtn)
//             ^? HTMLButtonElement
```

## API
### selectIn
select all the given queries within the given element

```ts
import { query, selectIn } from '@vyke/dom'
import { unwrap } from '@vyke/results'

const [myDiv, listItems] = unwrap(selectIn(
	document.body, // <- the container
	query<HTMLDivElement>('#my-div'), // type given as generic
	queryAll<HTMLLIElement>('.list-item'), // type given as the class
	// ^ this query will check `element instanceof HTMLLIElement
))
```
> [!NOTE]
> If any of the given queries return null the whole is considered a
> failure, returning an Err

### select
Shortcut to selectIn using document as the container

```ts
import { query, select, selectIn } from '@vyke/dom'
import { unwrap } from '@vyke/results'

const [myDiv, listItems] = unwrap(selectIn(
	document, // <- the container
	query<HTMLDivElement>('#my-div'), // type given as generic
	queryAll<HTMLLIElement>('.list-item'), // type given as the class
	// ^ this query will check `element instanceof HTMLLIElement
))
// both way are equivalent
const [myDiv, listItems] = unwrap(select(
	query<HTMLDivElement>('#my-div'), // type given as generic
	queryAll<HTMLLIElement>('.list-item'), // type given as the class
	// ^ this query will check `element instanceof HTMLLIElement
))
```

### query
Creates a query to be used inside of select or selectIn, and return only one element

```ts
import { query, select } from '@vyke/dom'
import { unwrap } from '@vyke/results'

unwrap(select(
	query<HTMLDivElement>('#my-div'), // type given as generic
	query('.list-item', HTMLLIElement), // type given as the class
	// ^ this query will check `element instanceof HTMLLIElement
))
```

### queryAll
Similar to `query` but return an array of elements

```ts
import { query, select } from '@vyke/dom'
import { unwrap } from '@vyke/results'
const [listItems] = unwrap(select(
//         ^? Array<HTMLLIElement>
	queryAll<HTMLLIElement>('.list-item'),
))
```

# Others vyke projects
- [Flowmodoro app by vyke](https://github.com/albizures/vyke-flowmodoro)
- [@vyke/results](https://github.com/albizures/vyke-results)
- [@vyke/val](https://github.com/albizures/vyke-val)
- [@vyke/tsdocs](https://github.com/albizures/vyke-tsdocs)
