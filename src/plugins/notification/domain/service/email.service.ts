import { SendEmailDTO } from "../model/dto/send-email.dto";

export interface EmailService {

    /**
     * 
     * @param subject title
     * @param message html template with data
     * @param recipientEmails emails to send
     */
    sendMail(subject: string, message: string, recipientEmails: string[]): Promise<void>;

    /**
     * 
     * @param sendEmailDTO 
     */
    sendRecoverAccountMail(sendEmailDTO: SendEmailDTO): Promise<void>;
}