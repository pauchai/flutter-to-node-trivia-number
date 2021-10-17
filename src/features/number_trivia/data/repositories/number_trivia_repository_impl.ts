import Failure, { CacheFalure, ServerFalure } from "../../../../core/error/Failure";
import NumberTrivia from "../../domain/entities/number_trivia";
import number_trivia from "../../domain/entities/number_trivia";
import NumberTriviaRepository from "../../domain/repositories/number_trivia_repository";
import { NumberTriviaLocalDataSource } from "../datasources/number_trivia_local_data_source";
import { NumberTriviaRemoteDataSource } from "../datasources/number_trivia_remote_data_source";
import NetworkInfo from "../../../../core/network/network_info";
import { CacheException } from "../../../../core/error/exceptions";
import NumberTriviaModel from "../models/number_trivia_model";

type _ConcreteOrRandomChooser = () => Promise<NumberTriviaModel>

export default class NumberTriviaRepositoryImpl extends NumberTriviaRepository {
    remoteDataSource: NumberTriviaRemoteDataSource
    localDataSource: NumberTriviaLocalDataSource
    networkInfo: NetworkInfo

    constructor(
        remoteDataSource: NumberTriviaRemoteDataSource,
        localDataSource: NumberTriviaLocalDataSource,
        networkInfo: NetworkInfo
        ){
        super()
        this.remoteDataSource = remoteDataSource
        this.localDataSource = localDataSource
        this.networkInfo = networkInfo
    }

    async getConcreteNumberTrivia(num: number): Promise<NumberTrivia | Failure> {
       return await this._getTrivia(() => this.remoteDataSource.getConcreteNumberTrivia(num))        
    }

    async getRandomNumberTrivia(): Promise<NumberTrivia | Failure> {
       return await this._getTrivia(() => this.remoteDataSource.getRandomNumberTrivia()) 
    }

    async _getTrivia(
        getConcreteOrRandomNumberTrivia: _ConcreteOrRandomChooser
    ){
        if (await this.networkInfo.isConnected) {
            try {
                const remoteTrivia = await getConcreteOrRandomNumberTrivia()
                this.localDataSource.cacheNumberTrivia(remoteTrivia)
                return Promise.resolve(remoteTrivia)    
            } catch (ServerException) {
                return Promise.resolve(new ServerFalure())
            }
        } else {
            try {
                const localTrivia = await this.localDataSource.getLastNumberTrivia()
                return Promise.resolve(localTrivia)
            } catch (CacheException) {
                return Promise.resolve(new CacheFalure)

            }
            
        }   
    }
    
}