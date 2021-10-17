import NumberTriviaModel from "../models/number_trivia_model";

export abstract class NumberTriviaRemoteDataSource {
    /**
     * Calls the http://numbersapi.com/{number} endpoint.
     * @throws a [ServerException] for all error codes.
     */ 
    abstract getConcreteNumberTrivia(num: number): Promise<NumberTriviaModel>
    
    /**  Calls the http:// numbersapi.com/random endpoint.
    *  @throws a [ServerException] for all error codes. 
    */
    abstract getRandomNumberTrivia(): Promise<NumberTriviaModel>
  
}