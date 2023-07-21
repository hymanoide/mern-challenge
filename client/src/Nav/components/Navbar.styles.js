/*
 It's not a good way to manage the css styles by this way, but this project uses mainly Material UI with only a few overriding.
 Most recommended to use a pre-processed CSS or accordingly read documentation: https://mui.com/material-ui/customization/how-to-customize/
 */

const navbarStyles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    linkContainer: {
        display: 'inline-block',
    },
    link: {
        marginRight: '16px',
        color: 'white',
        textDecoration: 'none',
    },
};

export default navbarStyles;
