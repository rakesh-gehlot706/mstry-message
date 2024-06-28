// import * as React from 'react';

// interface EmailTemplateProps {
//     firstName: string;
// }

// export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
//     firstName,
// }) => (
//     <div>
//         <h1>Welcome, {firstName}!</h1>
//     </div>
// );

import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Text,
    Link,
    Row,
    Section,
    Column,
    Img,
    Button,
} from "@react-email/components";
import * as React from "react";
interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({username , otp}
    : VerificationEmailProps) {
        return (
            <Html lang='en' dir='ltr'>
                <Head>
                    <title>Verifation Code </title>
                    {/* <Font
                        family='Roboto'
                        fallbackFontFamily='Verdana'
                        url='https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBBc9.ttf'
                        format
                    /> */}
                </Head>

                <Preview>Here&apos;s your verification code: {otp}</Preview>
                <Section>
                    <Row>
                        <Heading as="h2">Hello {username},</Heading>
                    </Row>
                    <Row>
                        <Text>
                           Thank You for Registering , Please use the following Verifiaction 
                           code to complete Your registration.
                        </Text>
                    </Row>
                    <Row>
                        <Text>{otp}</Text>

                    </Row>
                    <Button 
                    href={`https://localhost:3000/verify/${username}
                    `}
                    style={{ color: '#61dafb'}}
                    >

                    </Button>
                </Section>

            </Html>
        );
    }
