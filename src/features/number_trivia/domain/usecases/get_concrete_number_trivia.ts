import UseCase, {Params} from "../../../../core/usecases/usecase";
import Failure from "../../../../core/error/Failure";
import NumberTrivia from "../entities/number_trivia";
import NumberTriviaRepository from "../repositories/number_trivia_repository";

export default class GetConcreteNumberTrivia implements UseCase<NumberTrivia, Params> {
    repository: NumberTriviaRepository
    
    constructor(repository: NumberTriviaRepository) {
        this.repository = repository
    }

    async execute(params: Params): Promise<NumberTrivia|Failure>  {
        return  await this.repository.getConcreteNumberTrivia(params.number)
    }
    
}

