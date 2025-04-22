// context/themes.ts
import { Theme } from '@react-navigation/native';

export const LightTheme: Theme = {
    dark: false,
    colors: {
        primary: '#6200ee',
        background: '#ffffff',
        card: '#ffffff',
        text: '#000000',
        border: '#cccccc',
        notification: '#ff80ab',
    },
    fonts: {
        regular: {
            fontFamily: '',
            fontWeight: 'bold'
        },
        medium: {
            fontFamily: '',
            fontWeight: 'bold'
        },
        bold: {
            fontFamily: '',
            fontWeight: 'bold'
        },
        heavy: {
            fontFamily: '',
            fontWeight: 'bold'
        }
    }
};

export const DarkTheme: Theme = {
    dark: true,
    colors: {
        primary: '#bb86fc',
        background: '#121212',
        card: '#1f1f1f',
        text: '#ffffff',
        border: '#272727',
        notification: '#ff80ab',
    },
    fonts: {
        regular: {
            fontFamily: '',
            fontWeight: 'bold'
        },
        medium: {
            fontFamily: '',
            fontWeight: 'bold'
        },
        bold: {
            fontFamily: '',
            fontWeight: 'bold'
        },
        heavy: {
            fontFamily: '',
            fontWeight: 'bold'
        }
    }
};
