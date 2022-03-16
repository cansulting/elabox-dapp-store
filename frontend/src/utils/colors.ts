export const ProgressColor = (processStatus: string): string => {
    let progressColor = 'primary'
    if (processStatus === 'error') {
        progressColor = 'danger'
    } else if (processStatus === 'installing') {
        progressColor = 'info'
    } else if (processStatus === 'completed') {
        progressColor = 'success'
    }
    return progressColor
}
//uppercase first letter
export const UppercaseFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
