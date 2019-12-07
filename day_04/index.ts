const input = "172851-675869";

const parse = (input: string): number[] =>
    input.split("-").map(value => parseInt(value));

const range = {
    min: parse(input)[0],
    max: parse(input)[1]
};

const isIncreasing = (str: string): boolean => {
    let index = 1;
    while (index < str.length) {
        const current = str[index];
        const previous = str[index - 1];

        if (current >= previous) {
            index++;
        } else return false;
    }
    return true;
};

const hasDoubleDigits = (str: string): boolean =>
    str.split("").some((value: string, index: number, array: string[]) => {
        return value === array[index + 1];
    });

const generatePasswords = (min: number, max: number): string[] => {
    let output = [];
    let i = min;
    while (i < max) {
        output.push(i.toString());
        i++;
    }
    return output;
};

const passwords = generatePasswords(range.min, range.max);

const result = passwords
    .filter(value => isIncreasing(value))
    .filter(value => hasDoubleDigits(value)).length;