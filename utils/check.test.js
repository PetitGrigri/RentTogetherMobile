import { isset, empty } from "./check";

/**
 * Tests de la fonction isset
 */
test('isset : variable non definie', () => {
    var foo;
    expect(
        isset(foo)
    ).toEqual(false);
});

test('isset : string "bar"', () => {
    var foo = "bar";
    expect(
        isset(foo)
    ).toEqual(true);
});

test('isset : int 1', () => {
    var foo = 1;
    expect(
        isset(foo)
    ).toEqual(true);
});

test('isset : empty array', () => {
    var foo = [];
    expect(
        isset(foo)
    ).toEqual(true);
});

test('isset : null var', () => {
    var foo = null;
    expect(
        isset(foo)
    ).toEqual(true);
});

/**
 * Tests de la fonction empty
 */

test('empty : variable non definie', () => {
    var foo;
    expect(
        empty(foo)
    ).toEqual(true);
});

test('empty : variable string "bar"', () => {
    var foo = "bar";
    expect(
        empty(foo)
    ).toEqual(false);
});

test('empty : variable int 1', () => {
    var foo = 1;
    expect(
        empty(foo)
    ).toEqual(false);
});

test('empty : empty array', () => {
    var foo = [];
    expect(
        empty(foo)
    ).toEqual(true);
});

test('empty : array with no empty value', () => {
    var foo = [
        "bar"
    ];
    expect(
        empty(foo)
    ).toEqual(false);
});

test('empty : array with empty array no empty value', () => {
    var foo = [
        "", 
        [""]
    ];
    expect(
        empty(foo)
    ).toEqual(true);
});


test('empty : int with no empty value', () => {
    var foo = 1;
    expect(
        empty(foo)
    ).toEqual(false);
});
