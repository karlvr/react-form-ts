"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleFormState_1 = require("../SimpleFormState");
var chai_1 = require("chai");
require("mocha");
describe('SimpleFormState tests', function () {
    var a = {
        name: 'My name',
        bs: [{
                title: 'My first title',
                count: 7,
            }],
        c: {
            contents: 'Deep',
        }
    };
    it('getValues() should be the initial state if we do nothing', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
    });
    it('should not be mutable', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.set('name', 'Changed');
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa2.getValues()).to.not.deep.equal(a);
        chai_1.expect(fsa2.getValues().name).to.equal('Changed');
    });
    it('object subs should not be mutable', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.subProperty('c');
        var fsa3 = fsa2.set('contents', 'Changed');
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa2.getValues()).to.deep.equal(a.c);
        chai_1.expect(fsa3.getValues()).to.not.deep.equal(a.c);
        chai_1.expect(fsa3.getValues().contents).to.equal('Changed');
    });
    it('object sub should merge', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.subProperty('c');
        var fsa3 = fsa2.set('contents', 'Changed');
        chai_1.expect(fsa3.getValues().contents).to.equal('Changed');
        var fsa4 = fsa.mergeProperty('c', fsa3.getValues());
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa4.getValues()).to.not.deep.equal(a);
        chai_1.expect(fsa4.getValues().c.contents).to.equal('Changed');
    });
    it('array subs should not be mutable', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.subIndexProperty('bs', 0);
        var fsa3 = fsa2.set('title', 'Changed');
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa2.getValues()).to.deep.equal(a.bs[0]);
        chai_1.expect(fsa3.getValues()).to.not.deep.equal(a.bs[0]);
        chai_1.expect(fsa3.getValues().title).to.equal('Changed');
    });
    it('array sub should merge', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.subIndexProperty('bs', 0);
        var fsa3 = fsa2.set('title', 'Changed');
        chai_1.expect(fsa3.getValues().title).to.equal('Changed');
        var fsa4 = fsa.mergeIndexProperty('bs', 0, fsa3.getValues());
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa4.getValues()).to.not.deep.equal(a);
        chai_1.expect(fsa4.getValues().bs[0].title).to.equal('Changed');
    });
    it('push', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.push('bs', {
            title: 'Pushed',
            count: 8,
        });
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa2.getValues().bs.length).to.equal(2);
    });
    it('push from empty', function () {
        var a = {
            name: 'My name',
            bs: [],
            c: {
                contents: 'Deep',
            }
        };
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.push('bs', {
            title: 'Pushed',
            count: 8,
        });
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa2.getValues().bs.length).to.equal(1);
    });
    it('splice one', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.push('bs', {
            title: 'First',
            count: 1,
        });
        var fsa3 = fsa2.push('bs', {
            title: 'Second',
            count: 2,
        });
        chai_1.expect(fsa3.getValues().bs).to.deep.equal([
            { title: 'My first title', count: 7 },
            { title: 'First', count: 1 },
            { title: 'Second', count: 2 }
        ]);
        var fsa4 = fsa3.splice('bs', 1, 1);
        chai_1.expect(fsa4.getValues().bs).to.deep.equal([
            { title: 'My first title', count: 7 },
            { title: 'Second', count: 2 }
        ]);
        chai_1.expect(fsa3.getValues().bs).to.deep.equal([
            { title: 'My first title', count: 7 },
            { title: 'First', count: 1 },
            { title: 'Second', count: 2 }
        ]);
    });
    it('splice remainder', function () {
        var a = {
            bs: [
                { title: 'One', count: 1 },
                { title: 'Two', count: 2 },
                { title: 'Three', count: 3 },
                { title: 'Four', count: 4 },
            ],
        };
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.splice('bs', 2);
        chai_1.expect(fsa2.getValues().bs).to.deep.equal([
            { title: 'One', count: 1 },
            { title: 'Two', count: 2 },
        ]);
    });
    it('splice add', function () {
        var a = {
            bs: [
                { title: 'One', count: 1 },
                { title: 'Two', count: 2 },
                { title: 'Three', count: 3 },
                { title: 'Four', count: 4 },
            ],
        };
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.splice('bs', 3, 0, { title: 'Insert 1', count: 5 }, { title: 'Insert 2', count: 6 });
        chai_1.expect(fsa2.getValues().bs).to.deep.equal([
            { title: 'One', count: 1 },
            { title: 'Two', count: 2 },
            { title: 'Three', count: 3 },
            { title: 'Insert 1', count: 5 },
            { title: 'Insert 2', count: 6 },
            { title: 'Four', count: 4 },
        ]);
        chai_1.expect(fsa.getValues().bs).to.deep.equal([
            { title: 'One', count: 1 },
            { title: 'Two', count: 2 },
            { title: 'Three', count: 3 },
            { title: 'Four', count: 4 },
        ]);
    });
});
