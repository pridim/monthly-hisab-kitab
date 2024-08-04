export const getFirstCapLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getPrefix = (gender: string) => {
    return gender === 'male' ? 'Mr.' : 'Mrs.'
}

export const getFormattedDate = (date: Date) => {
    
    let formattedDate = '';

    let dt = new Date(date);
    
    formattedDate = `${dt.getDate()}-${dt.getMonth()}-${dt.getFullYear()}`

    return formattedDate
}