export function abbreviateMiddle(input: string | any[], lengthBegin: any, lengthEnd: number) {
    if (input.length <= lengthBegin + lengthEnd) {

        return input;
    }

    var start = input.slice(0, lengthBegin);
    var end = input.slice(input.length - lengthEnd, input.length);
    return start + '...' + end;
}


export const zeroAddress = (): `0x${string}` => {
    return `0x${"0000000000000000000000000000000000000000"}`
};