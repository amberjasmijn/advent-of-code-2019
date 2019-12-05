import { input } from "./input";

const parsedInput = input.split(",").map(value => parseInt(value));

const setProgramState = (input: number[], first: number, second: number) => {
    input[1] = first;
    input[2] = second;
    return input;
};

// 1A
const runIntcodeProgram = (array: number[]) => {
    for (let index = 0; index < array.length; index += 4) {
        if (array[index] === 1) {
            array[array[index + 3]] =
                array[array[index + 1]] + array[array[index + 2]];
        } else if (array[index] === 2) {
            array[array[index + 3]] =
                array[array[index + 1]] * array[array[index + 2]];
        } else if (array[index] === 99) {
            break;
        }
    }
    return array[0];
};

// 1B
const operations = {
    1: (input: number[], x: number, y: number, result: number) =>
        (input[input[result]] = input[input[x]] + input[input[y]]),
    2: (input: number[], x: number, y: number, result: number) =>
        (input[input[result]] = input[input[x]] * input[input[y]])
};

const runIntcode = (array: number[], index = 0): number => {
    const operation = array[index];

    if (operation === 99) {
        return array[0];
    }

    if (operation === 1 || operation === 2) {
        operations[operation](array, index + 1, index + 2, index + 3);
    } else {
        throw new Error("Oops, something went wrong :(");
    }

    return runIntcode(array, index + 4);
};

// 2
const findOutput = (input: number[], requiredOutput: number) => {
    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            const array = [...input];
            array[1] = noun;
            array[2] = verb;
            const result = runIntcodeProgram(array);

            if (result === requiredOutput) {
                return 100 * noun + verb;
            }
        }
    }
};

console.log(runIntcodeProgram(setProgramState([...parsedInput], 12, 2))); // 1A
console.log(runIntcode(setProgramState([...parsedInput], 12, 2))); // 1B
console.log(findOutput([...parsedInput], 19690720)); // 2