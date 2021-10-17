import NumberTriviaModel from "../models/number_trivia_model";

export abstract class NumberTriviaLocalDataSource {
    /**
    * Gets the cached [NumberTriviaModel] which was gotten the last time when
    * the user had an internet connection.
    * @throws [CacheException] if no cached data is present
    */


    abstract getLastNumberTrivia(): Promise<NumberTriviaModel>
    abstract cacheNumberTrivia(triviaToCache: NumberTriviaModel): Promise<void>
}