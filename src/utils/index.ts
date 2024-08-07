export const getFirstCapLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getPrefix = (gender: string) => {
    return gender === 'male' ? 'Mr.' : 'Mrs.'
}

export const getFormattedDate = (date: string) => {
    
    let formattedDate = '';

    let dt = new Date(date);
    
    formattedDate = `${dt.getDate()}-${dt.getMonth()}-${dt.getFullYear()}`

    return formattedDate
}

export const getLoggedInUserDetails = () => {
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    const user = loggedInUser ? JSON.parse(loggedInUser) : null;

    return user
}

export const showBackButton = (path: string) => {
    const arraysListToShowBackButton = [
        '/add-new-record'
    ]
    return arraysListToShowBackButton.includes(path)
}