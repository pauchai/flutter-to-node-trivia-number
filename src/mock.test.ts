import { anyNumber, mock, verify, when } from "ts-mockito";

abstract class  Repository {
    abstract getNumber(number: bigint):bigint 
}

class GetNumber {
    repository: Repository
    constructor(repository: Repository){
        this.repository = repository
    }

    execute(number:bigint):bigint {
        return this.repository.getNumber(number)
    }
}

const tnumber = BigInt(1)

test("shold Dummy return getNumber as integer", () => {

    let repository: Repository = {
        getNumber: jest.fn((tnumber) => {
            return tnumber
        })
    }
    const getNumber: GetNumber = new GetNumber(repository)
    let result = getNumber.execute(tnumber)

    expect(result).toBe(tnumber)
    expect(repository.getNumber).toHaveBeenCalled()
    expect(repository.getNumber).toHaveBeenCalledTimes(1)
    
    
}) 