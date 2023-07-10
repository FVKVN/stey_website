import { object, string } from 'yup';

const requiredString = (key: string) => `${key} is een verplicht veld`;

export const schema = object().shape({
    firstName: string()
        .required(requiredString('Voornaam')),
    lastName: string()
        .required(requiredString('Naam')),
    email: string()
        .email('Gelieve een geldig e-mailadres in te vullen')
        .required(requiredString('E-mail')),
    phone: string()
        .min(9, 'Gelieve een GSM / telefoonnummer in te vullen'),
    message: string()
        .required(requiredString('Bericht')),
});
