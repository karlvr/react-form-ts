import { SimpleFormState } from '../SimpleFormState'
import { expect } from 'chai'
import 'mocha'

interface A {
	name: string
	bs: B[]
	c: C
}

interface B {
	title: string
	count: number
}

interface C {
	contents: string
}

describe('SimpleFormState tests', () => {
	const a: A = {
		name: 'My name',
		bs: [{
			title: 'My first title',
			count: 7,
		}],
		c: {
			contents: 'Deep',
		}
	}

	it('getValues() should be the initial state if we do nothing', () => {
		const fsa = new SimpleFormState(a)
		expect(fsa.getValues()).to.deep.equal(a)
	})

	it('should not be mutable', () => {
		const fsa = new SimpleFormState(a)
		const fsa2 = fsa.set('name', 'Changed')
		expect(fsa.getValues()).to.deep.equal(a)
		expect(fsa2.getValues()).to.not.deep.equal(a)
		expect(fsa2.getValues().name).to.equal('Changed')
	})

	it('object subs should not be mutable', () => {
		const fsa = new SimpleFormState(a)
		const fsa2 = fsa.subProperty('c')
		const fsa3 = fsa2.set('contents', 'Changed')
		expect(fsa.getValues()).to.deep.equal(a)
		expect(fsa2.getValues()).to.deep.equal(a.c)
		expect(fsa3.getValues()).to.not.deep.equal(a.c)
		expect(fsa3.getValues().contents).to.equal('Changed')
	})

	it('object sub should merge', () => {
		const fsa = new SimpleFormState(a)
		const fsa2 = fsa.subProperty('c')
		const fsa3 = fsa2.set('contents', 'Changed')

		expect(fsa3.getValues().contents).to.equal('Changed')
		const fsa4 = fsa.mergeProperty('c', fsa3.getValues())
		expect(fsa.getValues()).to.deep.equal(a)
		expect(fsa4.getValues()).to.not.deep.equal(a)
		expect(fsa4.getValues().c.contents).to.equal('Changed')
	})

	it('array subs should not be mutable', () => {
		const fsa = new SimpleFormState(a)
		const fsa2 = fsa.subIndexProperty('bs', 0)
		const fsa3 = fsa2.set('title', 'Changed')

		expect(fsa.getValues()).to.deep.equal(a)
		expect(fsa2.getValues()).to.deep.equal(a.bs[0])
		expect(fsa3.getValues()).to.not.deep.equal(a.bs[0])
		expect(fsa3.getValues().title).to.equal('Changed')
	})

	it('array sub should merge', () => {
		const fsa = new SimpleFormState(a)
		const fsa2 = fsa.subIndexProperty('bs', 0)
		const fsa3 = fsa2.set('title', 'Changed')

		expect(fsa3.getValues().title).to.equal('Changed')
		const fsa4 = fsa.mergeIndexProperty('bs', 0, fsa3.getValues())
		expect(fsa.getValues()).to.deep.equal(a)
		expect(fsa4.getValues()).to.not.deep.equal(a)
		expect(fsa4.getValues().bs[0].title).to.equal('Changed')
	})

	it('push', () => {
		const fsa = new SimpleFormState(a)
		const fsa2 = fsa.push('bs', {
			title: 'Pushed',
			count: 8,
		})

		expect(fsa.getValues()).to.deep.equal(a)
		expect(fsa2.getValues().bs.length).to.equal(2)
	})

	it('push from empty', () => {
		const a: A = {
			name: 'My name',
			bs: [],
			c: {
				contents: 'Deep',
			}
		}
		const fsa = new SimpleFormState(a)
		const fsa2 = fsa.push('bs', {
			title: 'Pushed',
			count: 8,
		})

		expect(fsa.getValues()).to.deep.equal(a)
		expect(fsa2.getValues().bs.length).to.equal(1)
	})

})
