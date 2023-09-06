const domain = window.location.hostname;
export const apiBaseUrl = `http://${domain}/api`;


export const linksRoutes = {
    home: '/', 
    signup: '/signup',
    limits: '/limits',
    statistic: '/statistic',
    profile: '/profile'

}


export const linksLoggedIntUser = [
    {
        name: 'Dashboard',
        link: '/dashboard',
        icon: 'DashboardIcon'
    },
    {
        name: 'Limits',
        link: '/limits',
        icon: 'CreditCardIcon'
    },
    {
        name: 'Statistic',
        link: '/statistic',
        icon: 'LegendToggleIcon'
    },
    {
        name: 'Shopping List',
        link: '/shopping',
        icon: 'ShoppingCartIcon'
    },
    {
        name: 'Profile',
        link: '/profile',
        icon: 'PersonIcon'
    },
    {
        name: 'Logout',
        link: '/',
        icon: 'LogoutIcon'
    },
]