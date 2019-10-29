import { sum } from "../src/utils";

describe("sum", () => {
  test("1+1", () => {
    expect(sum(1,1)).toBe(2);
  })
})