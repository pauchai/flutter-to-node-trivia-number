
import { NumberTriviaLocalDataSource } from "../datasources/number_trivia_local_data_source"
import { NumberTriviaRemoteDataSource } from "../datasources/number_trivia_remote_data_source"
import NetworkInfo from "../../../../core/network/network_info"
import NumberTriviaRepositoryImpl from "./number_trivia_repository_impl"
import NumberTriviaModel from "../models/number_trivia_model"
import NumberTrivia from "../../domain/entities/number_trivia"
import { createMock } from "ts-auto-mock"
import ServerException, { CacheException } from "../../../../core/error/exceptions"
import { CacheFalure, ServerFalure } from "../../../../core/error/Failure"


describe("getGetConcreteNumberTrivia", () => {
   
    const tNumber = 1
    const tNumberTriviaModel: NumberTriviaModel = new NumberTriviaModel(tNumber, "test trivia")
    const tNumberTrivia: NumberTrivia = tNumberTriviaModel

    let mockNetworkInfo: NetworkInfo 
    let MockedLocalDataSource: NumberTriviaLocalDataSource
    let mockRemoteDataSource: NumberTriviaRemoteDataSource //= createMock<NumberTriviaRemoteDataSource>()
    let mockLocalDataSource: NumberTriviaLocalDataSource //= createMock<NumberTriviaLocalDataSource>()
    let repository:NumberTriviaRepositoryImpl// = new NumberTriviaRepositoryImpl(mockRemoteDataSource, mockLocalDataSource, mockNetworkInfo)
    
    mockNetworkInfo = createMock<NetworkInfo>()
    mockLocalDataSource = createMock<NumberTriviaLocalDataSource>()
    mockRemoteDataSource = createMock<NumberTriviaRemoteDataSource>()
    repository = new NumberTriviaRepositoryImpl(mockRemoteDataSource, mockLocalDataSource, mockNetworkInfo)

    afterEach(() => {
        jest.clearAllMocks()
        jest.resetAllMocks()

    })
     
    

    test("should check if device is online", async () => {
        //mockNetworkInfo.isConnected =  jest.fn(async () => Promise.resolve(true))
        
        jest.spyOn(mockNetworkInfo, "isConnected", 'get').mockImplementation(async () => Promise.resolve(true))  

        repository.getConcreteNumberTrivia(tNumber)
        expect(mockNetworkInfo.isConnected).toHaveBeenCalled()
        expect(await mockNetworkInfo.isConnected).toEqual(true)
        
    })

    function runTestOnline(body:Function):void{
        describe("device is online", () => {
            beforeEach(() => {
                Object.defineProperty(mockNetworkInfo, 'isConnected', {
                    get: jest.fn(() => async () => Promise.resolve(true)),
        
                  })
               //jest.spyOn(mockNetworkInfo, "isConnected", "get").mockImplementation(async () => Promise.resolve(true))  
            })
            
            body()

        })
    }
    function runTestOffline(body:Function):void{
        describe("device is offline", () => {
            beforeEach(() => {
               jest.spyOn(mockNetworkInfo, "isConnected", "get").mockImplementation(async () => Promise.resolve(false))  
            })
            
            body()

    })

     runTestOnline(
       () => {
        test("should return remote data when remote data source is succesfull", async () => {
            jest.spyOn(mockRemoteDataSource, "getConcreteNumberTrivia").mockImplementation(async (number:any) => Promise.resolve(tNumberTriviaModel))
 
            const result = await repository.getConcreteNumberTrivia(tNumber)
 
             expect(mockRemoteDataSource.getConcreteNumberTrivia).toHaveBeenCalledWith(tNumber)
             expect(result).toBe(tNumberTriviaModel)
         })
         test("should cache the data localy when remote data source is succesfull", async () => {
              
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
       }  
     )

    }
    runTestOffline(() => {
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



describe("getGetRandomNumberTrivia", () => {
   
    const tNumber = 123
    const tNumberTriviaModel: NumberTriviaModel = new NumberTriviaModel(tNumber, "test trivia")
    const tNumberTrivia: NumberTrivia = tNumberTriviaModel

    let mockNetworkInfo: NetworkInfo 
    let MockedLocalDataSource: NumberTriviaLocalDataSource
    let mockRemoteDataSource: NumberTriviaRemoteDataSource //= createMock<NumberTriviaRemoteDataSource>()
    let mockLocalDataSource: NumberTriviaLocalDataSource //= createMock<NumberTriviaLocalDataSource>()
    let repository:NumberTriviaRepositoryImpl// = new NumberTriviaRepositoryImpl(mockRemoteDataSource, mockLocalDataSource, mockNetworkInfo)
    
    mockNetworkInfo = createMock<NetworkInfo>()
    mockLocalDataSource = createMock<NumberTriviaLocalDataSource>()
    mockRemoteDataSource = createMock<NumberTriviaRemoteDataSource>()
    repository = new NumberTriviaRepositoryImpl(mockRemoteDataSource, mockLocalDataSource, mockNetworkInfo)

    afterEach(() => {
        jest.clearAllMocks()

    })
     
    

    test("should check if device is online", async () => {
        //mockNetworkInfo.isConnected =  jest.fn(async () => Promise.resolve(true))
        jest.spyOn(mockNetworkInfo, "isConnected", "get").mockImplementation(async () => Promise.resolve(true))  

        await repository.getRandomNumberTrivia()
        expect(await mockNetworkInfo.isConnected).toEqual(true)
        
    })

    function runTestOnline(body:Function):void{
        describe("device is online", () => {
            beforeEach(() => {
               jest.spyOn(mockNetworkInfo, "isConnected", "get").mockImplementation(async () => Promise.resolve(true))  
            })
            
            body()

        })
    }
    function runTestOffline(body:Function):void{
        describe("device is offline", () => {
            beforeEach(() => {
               jest.spyOn(mockNetworkInfo, "isConnected", "get").mockImplementation(async () => Promise.resolve(false))  
            })
            
            body()

        })
    }
     runTestOnline(
       () => {
        test("should return remote data when remote data source is succesfull", async () => {
            jest.spyOn(mockRemoteDataSource, "getRandomNumberTrivia").mockImplementation(async () => Promise.resolve(tNumberTriviaModel))
 
            const result = await repository.getRandomNumberTrivia()
 
             expect(mockRemoteDataSource.getRandomNumberTrivia).toHaveBeenCalled()
             expect(result).toBe(tNumberTriviaModel)
         })
         test("should cache the data localy when remote data source is succesfull", async () => {
              
             await repository.getRandomNumberTrivia()
  
              expect(mockRemoteDataSource.getRandomNumberTrivia).toHaveBeenCalled()
              expect(mockLocalDataSource.cacheNumberTrivia).toHaveBeenCalledWith(tNumberTriviaModel)
          })
         
        test("should return server failure when remote data source is unsuccesfull", async () => {
             jest.spyOn(mockRemoteDataSource, "getRandomNumberTrivia").mockImplementation(
                     async () => {throw new ServerException()}
                 )
  
             const  result =  await repository.getRandomNumberTrivia()
 
             expect(mockRemoteDataSource.getRandomNumberTrivia).toHaveBeenCalled()
             expect(mockLocalDataSource.getLastNumberTrivia).not.toHaveBeenCalled()
             expect(result instanceof ServerFalure).toEqual(true)
         })
       }  
     )

    runTestOffline(() => {
        test("should return localy cached data when the cached data is present", async () => {
            jest.spyOn(mockLocalDataSource, "getLastNumberTrivia").mockImplementation(
                async () => {return Promise.resolve(tNumberTriviaModel)}
            )

            const result = await repository.getRandomNumberTrivia()
            expect(mockRemoteDataSource.getRandomNumberTrivia).not.toHaveBeenCalled()
            expect(mockLocalDataSource.getLastNumberTrivia).toBeCalled()
        })

        test("should return CacheFailure when the no cached data is present", async () => {

            jest.spyOn(mockLocalDataSource, "getLastNumberTrivia").mockImplementation(
                async () => {throw new CacheException()}
            )

            const result = await repository.getRandomNumberTrivia()
            expect(mockRemoteDataSource.getRandomNumberTrivia).not.toHaveBeenCalled()
            expect(mockLocalDataSource.getLastNumberTrivia).toBeCalled()
            expect(result).toBeInstanceOf(CacheFalure)            
        })
    })
   
   
})


