import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import classNames from 'classnames';
import { schema } from './contactComponent.schema';
import Button from '../../../Button';
import { IContactPayload } from '../../../../../models/api/contact.models';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
};

enum FormState {
    INITIAL = 'INITIAL',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

const FORM_NAME = 'contact-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const encode = (data:any) => Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

export default function ContactContent() {
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState<FormState>(FormState.INITIAL);

    const onSubmit = (values: IContactPayload) => {
        setIsLoading(true);
        setFormState(FormState.INITIAL);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({ 'form-name': FORM_NAME, ...values }),
        })
            .then(() => {
                setFormState(FormState.SUCCESS);
                setIsLoading(false);
                console.log('success');
            })
            .catch((error) => {
                setFormState(FormState.ERROR);
                setIsLoading(false);
                console.warn(error);
            });
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={schema}
        >
            {({ errors, touched }) => (
                <Form className="contact-form" name={FORM_NAME}>
                    {formState === FormState.SUCCESS && (
                        <p className="contact-form__success-message">
                            Bedankt! Je bericht is verzonden.
                        </p>
                    )}

                    <div
                        className={
                            classNames('form-group', {
                                'form-group--has-error': errors.firstName && touched.firstName,
                            })
                        }
                    >
                        <label className="form-label" htmlFor="firstName">
                            <Field
                                id="firstName"
                                className="form-control"
                                type="text"
                                name="firstName"
                                placeholder="Voornaam"
                            />
                            <span>
                                Voornaam
                            </span>
                        </label>
                        <ErrorMessage className="form-error" name="firstName" component="p" />
                    </div>
                    <div
                        className={
                            classNames('form-group', {
                                'form-group--has-error': errors.lastName && touched.lastName,
                            })
                        }
                    >
                        <label className="form-label" htmlFor="lastName">
                            <Field
                                id="lastName"
                                className="form-control"
                                type="text"
                                name="lastName"
                                placeholder="Naam"
                            />
                            <span>
                                Naam
                            </span>
                        </label>
                        <ErrorMessage className="form-error" name="lastName" component="p" />
                    </div>
                    <div
                        className={
                            classNames('form-group', {
                                'form-group--has-error': errors.email && touched.email,
                            })
                        }
                    >
                        <label className="form-label" htmlFor="email">
                            <Field
                                id="email"
                                className="form-control"
                                type="email"
                                name="email"
                                placeholder="E-mail"
                            />
                            <span>
                                E-mail
                            </span>
                        </label>
                        <ErrorMessage className="form-error" name="email" component="p" />
                    </div>
                    <div
                        className={
                            classNames('form-group', {
                                'form-group--has-error': errors.phone && touched.phone,
                            })
                        }
                    >
                        <label className="form-label" htmlFor="phone">
                            <Field
                                id="phone"
                                className="form-control"
                                type="tel"
                                name="phone"
                                placeholder="GSM / telefoonnummer"
                            />
                            <span>GSM / telefoonnummer <small>[optioneel]</small></span>
                        </label>
                        <ErrorMessage className="form-error" name="phone" component="p" />
                    </div>
                    <div
                        className={
                            classNames('form-group', {
                                'form-group--has-error': errors.message && touched.message,
                            })
                        }
                    >
                        <label className="form-label form-label--multiline" htmlFor="message">
                            <Field
                                id="message"
                                className="form-control"
                                type="text"
                                as="textarea"
                                name="message"
                                placeholder="Bericht"
                            />
                            <span>Bericht</span>
                        </label>
                        <ErrorMessage className="form-error" name="message" component="p" />
                    </div>
                    <div className="form-group">
                        <Button
                            id="submit-registration"
                            typeName="secondary"
                            submit={{ formName: FORM_NAME }}
                            disabled={isLoading}
                        >
                            Verstuur
                        </Button>
                    </div>
                    <FocusError />
                </Form>
            )}
        </Formik>

    );
}

function FocusError() {
    const { errors, isSubmitting, isValidating, isValid } = useFormikContext();

    useEffect(() => {
        if (isSubmitting && !isValidating) {
            const keys = Object.keys(errors);
            if (keys.length) {
                scrollToField(keys[0] as keyof IContactPayload);
            }
        }
    }, [errors, isSubmitting, isValidating, isValid]);
    return null;
}

function scrollToField(fieldname: keyof IContactPayload) {
    const selector = `[name=${fieldname}]`;
    const errorElement = document.querySelector(selector) as HTMLElement;
    if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus({ preventScroll: true });
    }
}
