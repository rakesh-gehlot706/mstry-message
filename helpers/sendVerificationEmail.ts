import {resend} from "@/lib/resend";
import VerificationEmail from "../emails/verifiactionEmail";
import {ApiResponse} from "@/types/ApiResponse";

export async function sendVerificationEmail(
    username: string,
    email: string,
    otp: string
): Promise<ApiResponse> {
    try {
        // this code taken by next js resend(send emaiul using react)
        await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: ' Mstry Message  | Verification Code',
        react: VerificationEmail({username, otp: verifyCode}),
});
        return {success: true , message: " Verification email sent successfully"}
        
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return {
            success: false, message: "Failed to send verification email",
    
    }
    }
}