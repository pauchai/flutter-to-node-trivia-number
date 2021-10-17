import NumberTrivia from "../entities/number_trivia"
import NumberTriviaRepository from "../repositories/number_trivia_repository"
import GetRandomNumberTrivia  from "./get_random_number_trivia"
import {NoParams} from "../../../../core/usecases/usecase";



let usecase: GetRandomNumberTrivia
const tnumber: number = 1
const tNumberTrivia = new NumberTrivia(tnumber, 'test')



test("should get trivia for the number from repository", async ()  => {

  const mockNumberTriviaRepository: NumberTriviaRepository = {
    getConcreteNumberTrivia: jest.fn(async (tnumber) =>  {
      return  Promise.resolve(tNumberTrivia)
     }),
    getRandomNumberTrivia: jest.fn( async () =>  {
      return  Promise.resolve(tNumberTrivia)
     })
  }
  usecase = new GetRandomNumberTrivia( mockNumberTriviaRepository)

  const result =  await usecase.execute(new NoParams())

  expect(result).toBe(tNumberTrivia)
  expect(mockNumberTriviaRepository.getRandomNumberTrivia).toHaveBeenCalledWith()
  expect(mockNumberTriviaRepository.getRandomNumberTrivia).toHaveBeenCalledTimes(1)
})
