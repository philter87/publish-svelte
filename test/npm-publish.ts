import {isLoggedIn} from "../src/npm-publish";
import assert from 'assert';

describe('npm-publish', () => {
  it('isLoggedIn', () => {
    assert(!isLoggedIn());
  })
});
