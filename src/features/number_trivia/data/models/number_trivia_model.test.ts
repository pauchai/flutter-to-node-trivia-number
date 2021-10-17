import fixture from "../../../../test_fixtures/fixture_reader";
import NumberTrivia from "../../domain/entities/number_trivia";
import NumberTriviaModel from "./number_trivia_model";

import * as triviaJson from "../../../../test_fixtures/trivia.json"
import * as triviaDoubleJson from "../../../../test_fixtures/trivia_double.json"

const tNumber = 1
const numberTriviaModel = new NumberTriviaModel(1 , "Test Text")

test("should be subclass  of NumberTriviaEntity",
     async () => {
            expect(numberTriviaModel).toBeInstanceOf(NumberTrivia)
     }
)

describe("fromJson", () => {
     test (
          'should return a valid model when the JSON number is integer',
          async () => {
               const jsonObj = triviaJson
               const result = NumberTriviaModel.fromJson(jsonObj)

               expect(result).toEqual(numberTriviaModel)

          }
     )
     test (
          'should return a valid model when the JSON number is regarded as double',
          async () => {
               const jsonObj = triviaDoubleJson
               const result = NumberTriviaModel.fromJson(jsonObj)

               expect(result).toEqual(numberTriviaModel)

          }
     )
}) 

describe("toJson", () => {
     test(
          'should return a json obj containing the proper data',
          async () => {
               const result = numberTriviaModel.toJson()

               const expected = {"text": "Test Text","number": 1}
               expect(result).toEqual(expected)
          }
     )
})