import {makeAutoObservable} from "mobx"

export default class AdminStore {
    constructor () {
        this._numberOfList = 0
        makeAutoObservable(this)
    }

    setNumberOfList(num){
        this._numberOfList = num
    }

    get numberOfList(){
        return this._numberOfList
    }

}