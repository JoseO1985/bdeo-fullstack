export class MockResponse {
    constructor () {}
    status(status: number){
        return this;
    } 
    
    json(data: { status: string, data: any}){
        return this;
    } 
}