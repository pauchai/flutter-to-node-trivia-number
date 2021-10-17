import "ts-mockito"
abstract class  Repository {
    abstract getNumber(number: bigint):Promise<bigint>
}

class GetNumber {
    repository: Repository
    constructor(repository: Repository){
        this.repository = repository
    }

    async execute(number:bigint):Promise<bigint> {
        const result = await  this.repository.getNumber(number)
        return result 
    }
}

const tnumber = BigInt(1)

test("shold Dummy return getNumber as integer", async () => {

    let repository: Repository = {
        getNumber: jest.fn((tnumber) =>  {
            return  Promise.resolve(tnumber)
        } 
        )
    }
    const getNumber: GetNumber = new GetNumber(repository)
    let result = await getNumber.execute(tnumber)

    expect(result).toBe(tnumber)
    expect(repository.getNumber).toHaveBeenCalled()
    expect(repository.getNumber).toHaveBeenCalledTimes(1)
    
    
}) 
