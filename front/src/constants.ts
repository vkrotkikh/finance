export const apiBaseUrl = 'http://localhost:3001/api';


export const links = {
    home: '/',
    forgotPassword: '/forgot-password',
    signup: '/signup',
    limits: '/limits',
    statistic: '/statistic'
}


export const concatYearMonth = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}${month.toString().padStart(2, '0')}`;
}