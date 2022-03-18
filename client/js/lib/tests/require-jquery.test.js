const trimDots = require('./trimDots_function_to_test').trimDots;

test('test simple trimDots', () => {
    let input = ['a', 'b', 'c', '..', 'd'];
    let expected = ['a', 'b', 'd'];
    trimDots(input);
    expect(input).toEqual(expected);
});

test('test trimDots with .. at the end', () => {
    let input = ['a', 'b', 'c', '..'];
    let expected = ['a', 'b'];
    trimDots(input);
    expect(input).toEqual(expected);
});

test('test trimDots with .. at the beginning', () => {
    let input = ['..', 'a', 'b', 'c'];
    let expected = ['..', 'a', 'b', 'c'];
    trimDots(input);
    expect(input).toEqual(expected);
});

test('test trimDots with . in the middle', () => {
    let input = ['a', 'b', '.', 'c'];
    let expected = ['a', 'b', 'c'];
    trimDots(input);
    expect(input).toEqual(expected);
});

test('test trimDots with . at the beginning', () => {
    let input = ['.', 'a', 'b', 'c'];
    let expected = ['a', 'b', 'c'];
    trimDots(input);
    expect(input).toEqual(expected);
});

test('test trimDots with . at the end', () => {
    let input = ['a', 'b', 'c', '.'];
    let expected = ['a', 'b', 'c'];
    trimDots(input);
    expect(input).toEqual(expected);
});