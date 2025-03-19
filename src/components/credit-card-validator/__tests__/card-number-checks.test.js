import cardNumberChecks from "../card-number-checks";

test.each([
  ["4485292032285529", true],
  ["3544557331886255", true],
  ["371363171843496", true],
  ["3127654689779699427", true],
  ["6282698200143144", true],
  ["36236362451344", true],
  ["6759524932417677", true],
  ["2200296398683050", true],
  ["2720996009243829", true],
  ["6557376324820346818", true],
  ["1144557331886255", false],
])(
  "testing class cardNumberChecks function cardChecks with argument %s",
  (card, expected) => {
    const result = cardNumberChecks.cardChecks(card);
    expect(result).toBe(expected);
  },
);
