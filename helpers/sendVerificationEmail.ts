import { resend } from "@/lib/resend";
import VerificationEmail from "../emails/verifiactionEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    username: string,
    email: string,
    otp: string
): Promise<ApiResponse> {
    console.log("in the verification email----")
    try {
        // this code taken by next js resend(send emaiul using react)
        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: ' Mstry Message  | Verification Code',
            react: VerificationEmail({ username, otp }),
        });
        console.log("after sending verification email-----", response)
        return { success: true, message: " Verification email sent successfully" }

    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return {
            success: false, message: "Failed to send verification email",

        }
    }
}