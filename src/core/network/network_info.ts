export default abstract class NetworkInfo {

    abstract  get isConnected(): Promise<boolean> 

}