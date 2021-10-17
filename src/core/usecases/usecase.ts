import Failure from "../error/Failure";

export default interface UseCase<Type, Params> {
    execute(params: Params):  Promise<Type|Failure>
}

export class Params {

    number: number

    constructor(num: number) {
        this.number = num
    }

}

export class NoParams {

}