//import { instance, mock, verify, when } from "ts-mockito"
import { NumberTriviaLocalDataSource } from "../datasources/number_trivia_local_data_source"
import { NumberTriviaRemoteDataSource } from "../datasources/number_trivia_remote_data_source"
import NetworkInfo from "../../../../core/network/network_info"
import NumberTriviaRepositoryImpl from "./number_trivia_repository_impl"
import NumberTriviaModel from "../models/number_trivia_model"
import NumberTrivia from "../../domain/entities/number_trivia"
import { createMock } from "ts-auto-mock"
import ServerException, { CacheException } from "../../../../core/error/exceptions"
import { CacheFalure, ServerFalure } from "../../../../core/error/Failure"
//const MockRemoteDataSource:NumberTriviaRemoteDataSource = mock(NumberTriviaRemoteDataSource)
//const MockLocalDataSource:NumberTriviaLocalDataSource = mock(NumberTriviaLocalDataSource)
//const MockNetworkInfo: NetworkInfo = mock(NetworkInfo)

//const mockRemoteDataSource:NumberTriviaRemoteDataSource  = instance(MockRemoteDataSource)
//const mockLocalDataSource:NumberTriviaLocalDataSource  = instance(MockLocalDataSource)
//const mockNetworkInfo: NetworkInfo = instance(MockNetworkInfo)








describe("getGetConcreteNumberTrivia", () => {
    const tNumber = 1
    const tNumberTriviaModel: NumberTriviaModel = new NumberTriviaModel(tNumber, "test trivia")
    const tNumberTrivia: NumberTrivia = tNumberTriviaModel

    let mockNetworkInfo: NetworkInfo = {
        isConnected:  jest.fn(async () =>  Promise.resolve(true))
    }
    let mockRemoteDataSource: NumberTriviaRemoteDataSource = createMock<NumberTriviaRemoteDataSource>()
    let mockLocalDataSource: NumberTriviaLocalDataSource = createMock<NumberTriviaLocalDataSource>()
    
    let repository:NumberTriviaRepositoryImpl = new NumberTriviaRepositoryImpl(mockRemoteDataSource, mockLocalDataSource, mockNetworkInfo)

    

    test("should check if device is online", async () => {
    
        let mockRemoteDataSource: NumberTriviaRemoteDataSource = createMock<NumberTriviaRemoteDataSource>()
        const mockLocalDataSource: NumberTriviaLocalDataSource = createMock<NumberTriviaLocalDataSource>()
        const repository:NumberTriviaRepositoryImpl = new NumberTriviaRepositoryImpl(mockRemoteDataSource, mockLocalDataSource, mockNetworkInfo)

        repository.getConcreteNumberTrivia(tNumber)
        expect(mockNetworkInfo.isConnected).toHaveBeenCalled()
        expect(await mockNetworkInfo.isConnected()).toEqual(true)
        
    })

    describe("device is online", () => {
        let mockNetworkInfo: NetworkInfo = {
            isConnected:  jest.fn(async () => Promise.resolve(true))
        }
        test("should return remote data when remote data source is succesfull", async () => {
           jest.spyOn(mockRemoteDataSource, "getConcreteNumberTrivia").mockImplementation(async (number:any) => Promise.resolve(tNumberTriviaModel))

           const result = await repository.getConcreteNumberTrivia(tNumber)

            expect(mockRemoteDataSource.getConcreteNumberTrivia).toHaveBeenCalledWith(tNumber)
            expect(result).toBe(tNumberTriviaModel)
        })
        test("should cache the data localy when remote data source is succesfull", async () => {
            jest.spyOn(mockRemoteDataSource, "getConcreteNumberTrivia").mockImplementation(async (number:any) => Promise.resolve(tNumberTriviaModel))
 
            await repository.getConcreteNumberTrivia(tNumber)
 
             expect(mockRemoteDataSource.getConcreteNumberTrivia).toHaveBeenCalledWith(tNumber)
             expect(mockLocalDataSource.cacheNumberTrivia).toHaveBeenCalledWith(tNumberTriviaModel)
         })
        
        test("should return server failure when remote data source is unsuccesfull", async () => {
            jest.spyOn(mockRemoteDataSource, "getConcreteNumberTrivia").mockImplementation(
                    async (number:any) => {throw new ServerException()}
                )
 
            const  result =  await repository.getConcreteNumberTrivia(tNumber)

            expect(mockRemoteDataSource.getConcreteNumberTrivia).toHaveBeenCalledWith(tNumber)
            expect(mockLocalDataSource.getLastNumberTrivia).not.toHaveBeenCalled()
            expect(result instanceof ServerFalure).toEqual(true)
        })
    }) 
    describe("device is offline", () => {
       
        beforeEach(() => {
            let mockNetworkInfo: NetworkInfo = {
                isConnected:  jest.fn(async () => {return Promise.resolve(false)})
            }
            jest.clearAllMocks()
        })
        test("should return localy cached data when the cached data is present", async () => {
            jest.spyOn(mockLocalDataSource, "getLastNumberTrivia").mockImplementation(
                async () => {return Promise.resolve(tNumberTriviaModel)}
            )

            const result = await repository.getConcreteNumberTrivia(tNumber)
            expect(mockRemoteDataSource.getConcreteNumberTrivia).not.toHaveBeenCalled()
            expect(mockLocalDataSource.getLastNumberTrivia).toBeCalled()
        })

        test("should return CacheFailure when the no cached data is present", async () => {
            jest.spyOn(mockLocalDataSource, "getLastNumberTrivia").mockImplementation(
                async () => {throw new CacheException()}
            )

            const result = await repository.getConcreteNumberTrivia(tNumber)
            expect(mockRemoteDataSource.getConcreteNumberTrivia).not.toHaveBeenCalled()
            expect(mockLocalDataSource.getLastNumberTrivia).toBeCalled()
            expect(result).toBeInstanceOf(CacheFalure)            
        })
    })
})


