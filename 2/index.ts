import { input } from "./input";

let parsedInput = input.split(",").map(value => parseInt(value));

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
    return array;
};

const findOutput = function(input: number[], requiredOutput: number) {
    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            const array = [...input];
            array[1] = noun;
            array[2] = verb;
            const result = runIntcodeProgram(array)

            if(result[0] === requiredOutput) {
                return 100 * noun + verb
            }
        }
    }
};

console.log(findOutput(parsedInput, 19690720))