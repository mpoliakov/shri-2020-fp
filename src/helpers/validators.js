/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
    prop,
    curry,
    partialRight,
    compose,
    allPass,
    length,
    filter,
    values,
    equals,
    not,
    and
} from 'ramda';

const getStar = curry(prop)('star');
const getSquare = curry(prop)('square');
const getTriangle = curry(prop)('triangle');
const getCircle = curry(prop)('circle');

const checkColor = (figure, color) => figure === color;

const isWhite = partialRight(checkColor, ['white']);
const isRed = partialRight(checkColor, ['red']);
const isGreen = partialRight(checkColor, ['green']);
const isBlue = partialRight(checkColor, ['blue']);
const isOrange = partialRight(checkColor, ['orange']);

const notWhite = compose(not, isWhite);
const notRed = compose(not, isRed);
const notGreen = compose(not, isGreen);
const notBlue = compose(not, isBlue);
const notOrange = compose(not, isOrange);

const filterColor = (isColor) => compose(curry(filter)(isColor), values);
const countColor = (isColor) => compose(length, filterColor(isColor));
const equalsTo = (n) => curry(equals)(n);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (state) => allPass([
    compose(isRed, getStar),
    compose(isGreen, getSquare),
    compose(isWhite, getTriangle),
    compose(isWhite, getCircle)
    ])(state);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (state) => countColor(isGreen)(state) >= 2;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (state) => equals(countColor(isRed)(state), countColor(isBlue)(state));

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = (state) => allPass([
    compose(isBlue, getCircle),
    compose(isRed, getStar),
    compose(isOrange, getSquare)
    ])(state);

// 5. Три фигуры одного любого цвета кроме белого.
export const validateFieldN5 = (state) => countColor(notWhite)(state) === 3;

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (state) => allPass([
    compose(isGreen, getTriangle),
    compose(equalsTo(2), countColor(isGreen)),
    compose(equalsTo(1), countColor(isRed))
])(state);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (state) => countColor(notOrange)(state) === 0;

// 8. Не красная и не белая звезда.
export const validateFieldN8 = (state) => and(notRed(getStar(state)), notWhite(getStar(state)));

// 9. Все фигуры зеленые.
export const validateFieldN9 = (state) => countColor(notGreen)(state) === 0;

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = (state) => and(equals(getTriangle(state), getSquare(state)), notWhite(getTriangle(state)));
