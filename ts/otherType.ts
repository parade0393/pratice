const person = {
    name:'123'
}

const p : typeof person = {
    name: ''
}
console.log(p.name)

class Grade {
    score:number
    constructor(score:number) {
        this.score = score
    }
}
const g:Grade = {
    score:23
}
const gr:InstanceType<typeof Grade> = {
    score:23
}
const gn = new Grade(45)
export {}
