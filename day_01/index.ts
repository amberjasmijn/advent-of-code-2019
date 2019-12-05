import { input } from "./input";

const parsedInput = input.split("\n");

const divideByThree = (fuel: number) => Math.floor(fuel / 3);
const substractTwo = (fuel: number) => fuel - 2;
const calculateFuel = (value: number) => substractTwo(divideByThree(value));

const reducer = (acc: number, current: number, index: number) => {
    return acc + current;
};

const recursiveFuel = (moduleFuel: number): number => {
    let accumulator = moduleFuel;
    if (accumulator <= 0) {
        return 0;
    }
    return accumulator + recursiveFuel(calculateFuel(accumulator));
};

const calculateTotalFuel = (modules: string[]) =>
    modules
        .map(module => parseInt(module))
        .map(module => Math.floor(module / 3))
        .map(module => module - 2)
        .map(module => recursiveFuel(module))
        .reduce(reducer);

console.log(calculateTotalFuel(parsedInput));