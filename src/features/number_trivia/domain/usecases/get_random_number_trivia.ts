import UseCase, {NoParams} from "../../../../core/usecases/usecase";
import Failure from "../../../../core/error/Failure";
import NumberTrivia from "../entities/number_trivia";
import NumberTriviaRepository from "../repositories/number_trivia_repository";

export default class GetRandomNumberTrivia implements UseCase<NumberTrivia, NoParams> {
    repository: NumberTriviaRepository

    constructor(repository: NumberTriviaRepository) {
        this.repository = repository
    }

    async execute(params: NoParams): Promise<NumberTrivia|Failure>  {
        return  await this.repository.getRandomNumberTrivia()
    }
}

