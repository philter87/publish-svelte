import {detectCustomComponent, findEventEmitters, findExportedFields} from "../src/pelte-util";
import assert from 'assert';

describe('Find exported fields', () => {
  it('exported fields', () => {
    const names = ['n1','n2','n3','n4','n5','n6','n7'];
    const values = ['a ', 'a b', '?#¤','null', 1, 2, null];
    const script = `
      export let ${names[0]} = "${values[0]}";
      export let ${names[1]}= '${values[1]}';
      export    let     ${names[2]}  =  '${values[2]}'    ;
      export let ${names[3]}  = ${values[3]} ;
      export let ${names[4]} = ${values[4]};
      export const ${names[5]} = ${values[5]};
      export let ${names[6]};
    `;
    const fields = findExportedFields(script);
    assert.equal(names.length, fields.length, "Names should match field found");
    for (let i = 0; i < fields.length; i++) {
      assert.equal(fields[i].name, names[i]);
      assert.equal(fields[i].defaultValue, values[i])
    }
  });
  it('event emitters', () => {
    const script = `
      function sayHello() {
        dispatch('message', {
          text: 'Hello!'
        });
      }
    `;
    const events = findEventEmitters(script);
    assert.equal('message', events[0])
  });
  it('event emitters', () => {
    const script = `
      dispatch  (  'a1bc12'  , 'event');
    `;
    const events = findEventEmitters(script);
    assert.equal('a1bc12', events[0])
  });
  it('detect custom components', () => {
    let aScript = `<svelte:options tag="my-element">`;
    const wcInfo = detectCustomComponent(aScript);
    assert(wcInfo.exists)
    assert(!wcInfo.requireDefine);
    assert.equal(wcInfo.name, 'my-element')
  })
  it('detect custom components', () => {
    let aScript = `<svelte:options tag={null}>`;
    const wcInfo = detectCustomComponent(aScript);
    assert(wcInfo.exists);
    assert(wcInfo.requireDefine);
    assert.equal(wcInfo.name, null);
  })
});
