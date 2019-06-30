function hailstone (num) {
    let i;
    for (i = 0; num !== 1; ++i) {
        num = num % 2 ? num * 3 + 1 : num / 2;
    }
    return i;
}

console.log(hailstone(23061912));