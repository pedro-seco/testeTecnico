export function isIdValid(id:number){
    
    if(!Number.isInteger(id) || id <= 0) {
        return false
    }
    return true
}

export function isBodyEmpty(body:any){
    
    if (body === null){
        return true
    }
    return false
}

export function isAtributeMissing(atribute:any){
    if (atribute === null){
        return true
    }
    return false
}