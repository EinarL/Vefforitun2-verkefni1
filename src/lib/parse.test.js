import { describe, expect, it } from '@jest/globals';
import { parseJson } from './parse';

describe('parseJson', () => {
  it('should return an empty object, given an empty object in JSON format', () => {
    expect(parseJson('{}')).toEqual({});
  });

  it('should return the correct object, given an object in JSON format', () => {
    expect(parseJson('{"name":"John", "age":30, "city":"New York"}')).toEqual({
      name: 'John',
      age: 30,
      city: 'New York',
    });
  });

  it('should throw a SyntaxError, given an invalid JSON string', () => {
    expect(() => parseJson('This is not JSON :(')).toThrow(SyntaxError);
  });
});
