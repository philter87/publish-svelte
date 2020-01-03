import {detectCustomComponent, findEventEmitters, findExportedFields, findVars} from "../src/pelte-util";
import assert from 'assert';

const NAMES = ['n1','n2','n3','n4','n5','n6','n7'];
const VALUES = ['a ', 'a b', '?#¤','null', 1, 2, null];
const SCRIPT = `<script>
  let nameShouldNotBeIncluded = 123;
  export let ${NAMES[0]} = "${VALUES[0]}";
  export let ${NAMES[1]}= '${VALUES[1]}';
  export    let     ${NAMES[2]}  =  '${VALUES[2]}'    ;
  export let ${NAMES[3]}  = ${VALUES[3]} ;
  export let ${NAMES[4]} = ${VALUES[4]};
  export const ${NAMES[5]} = ${VALUES[5]};
  export let ${NAMES[6]};
</script>`;

describe('Find exported fields', () => {
  it('exported fields', () => {
    const fields = findExportedFields(SCRIPT);
    assert.equal(NAMES.length, fields.length, "Names should match field found");
    for (let i = 0; i < fields.length; i++) {
      assert.equal(fields[i].name, NAMES[i]);
      assert.equal(fields[i].defaultValue, VALUES[i])
    }
  });
  it('exported fields svelte compiler', () => {
    const fieldName = findVars(SCRIPT);
    assert.equal(NAMES.length, fieldName.length, "Names should match field found");
    for (let i = 0; i < fieldName.length; i++) {
      assert.equal(fieldName[i], NAMES[i]);
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
