const arr = [1,2,3,4,5,6]

outer: for (let i = 0; i <10; i++) {
    console.log(`a:${i}`)
    if (i ===2){
        for (let number of arr) {
            console.log(number)
            if ( number>3){
                break outer
            }
        }
    }
}