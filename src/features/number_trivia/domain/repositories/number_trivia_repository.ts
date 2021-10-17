import Failure from "../../../../core/error/Failure";
import NumberTrivia from "../entities/number_trivia";
export default abstract class  NumberTriviaRepository {
    abstract getConcreteNumberTrivia(num: number): Promise<NumberTrivia|Failure>
    abstract getRandomNumberTrivia(): Promise<NumberTrivia|Failure>

}