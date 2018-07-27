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
    it('SimpleFormState should not be mutable', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.set('name', 'Changed');
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa2.getValues()).to.not.deep.equal(a);
        chai_1.expect(fsa2.getValues().name).to.equal('Changed');
    });
    it('SimpleFormState object subs should not be mutable', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.subProperty('c');
        var fsa3 = fsa2.set('contents', 'Changed');
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa2.getValues()).to.deep.equal(a.c);
        chai_1.expect(fsa3.getValues()).to.not.deep.equal(a.c);
        chai_1.expect(fsa3.getValues().contents).to.equal('Changed');
    });
    it('SimpleFormState object sub should merge', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.subProperty('c');
        var fsa3 = fsa2.set('contents', 'Changed');
        chai_1.expect(fsa3.getValues().contents).to.equal('Changed');
        var fsa4 = fsa.mergeProperty('c', fsa3.getValues());
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa4.getValues()).to.not.deep.equal(a);
        chai_1.expect(fsa4.getValues().c.contents).to.equal('Changed');
    });
    it('SimpleFormState array subs should not be mutable', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.subIndexProperty('bs', 0);
        var fsa3 = fsa2.set('title', 'Changed');
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa2.getValues()).to.deep.equal(a.bs[0]);
        chai_1.expect(fsa3.getValues()).to.not.deep.equal(a.bs[0]);
        chai_1.expect(fsa3.getValues().title).to.equal('Changed');
    });
    it('SimpleFormState array sub should merge', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.subIndexProperty('bs', 0);
        var fsa3 = fsa2.set('title', 'Changed');
        chai_1.expect(fsa3.getValues().title).to.equal('Changed');
        var fsa4 = fsa.mergeIndexProperty('bs', 0, fsa3.getValues());
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa4.getValues()).to.not.deep.equal(a);
        chai_1.expect(fsa4.getValues().bs[0].title).to.equal('Changed');
    });
});
