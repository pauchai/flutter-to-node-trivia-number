import NumberTrivia from "../../domain/entities/number_trivia";

export default class NumberTriviaModel extends NumberTrivia {
    number: number
    text: string
    constructor(num: number, text: string) {
        super(num, text)
        this.number = num
        this.text = text
    }

    static fromJson(jsonObj: any): NumberTriviaModel {
        return new NumberTriviaModel(jsonObj.number, jsonObj.text)
    }
    toJson(): any {
        return {number: this.number, text: this.text}
    }
}