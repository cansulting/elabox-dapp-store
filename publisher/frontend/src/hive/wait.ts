function wait(sec:number) : Promise<void> {
    return new Promise( (res, rej) => {
        setTimeout(() => {
            res(null)
        }, sec * 1000)
    })
}

export default wait