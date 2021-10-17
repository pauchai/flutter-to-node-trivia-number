import NumberTrivia from "../entities/number_trivia"
import NumberTriviaRepository from "../repositories/number_trivia_repository"
import GetConcreteNumberTrivia from "./get_concrete_number_trivia"
import {Params} from "../../../../core/usecases/usecase";


let usecase: GetConcreteNumberTrivia
const tnumber: number = 1
const tNumberTrivia = new NumberTrivia(tnumber, 'test')



test("should get trivia for the number from repository", async ()  => {

  const mockNumberTriviaRepository: NumberTriviaRepository = {
    getConcreteNumberTrivia: jest.fn( async (tnumber) =>  {
      return  Promise.resolve(tNumberTrivia)
    }),
    getRandomNumberTrivia: jest.fn( async () =>  {
      return  Promise.resolve(tNumberTrivia)
     })
  }
  usecase = new GetConcreteNumberTrivia( mockNumberTriviaRepository)

  const result =  await usecase.execute(new Params(tnumber))

  expect(result).toBe(tNumberTrivia)
  expect(mockNumberTriviaRepository.getConcreteNumberTrivia).toHaveBeenCalledWith(tnumber)
  expect(mockNumberTriviaRepository.getConcreteNumberTrivia).toHaveBeenCalledTimes(1)
})
