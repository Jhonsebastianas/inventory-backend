import { Injectable } from "@nestjs/common";
import { EmailService } from "../domain/service/email.service";
import { SendEmailDTO } from "../domain/model/dto/send-email.dto";
import * as fs from "fs";
import * as nodemailer from "nodemailer";

const VARIABLES = {
    APP_NAME: "Inventarios",
    APP_URL_FRONT: "urlFront",
}

@Injectable()
export class EmailServiceImpl implements EmailService {

    async sendRecoverAccountMail(sendEmailDTO: SendEmailDTO): Promise<void> {
        sendEmailDTO.pathTemplate = "/public/plantillas/recover_account.html";
        const contentHTML = await this.buildPlantilla(sendEmailDTO);
        await this.sendMail("Recuperar cuenta", contentHTML, sendEmailDTO.recipientEmails);
    }

    async sendMail(subject: string, message: string, recipientEmails: string[]): Promise<void> {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false //Me permite envíar correos desde otro dominio
            }
        });
        const info = await transporter.sendMail({
            from: `'${VARIABLES.APP_NAME}' <${process.env.EMAIL_USERNAME}>`,
            to: recipientEmails, //A quien se le enviara el correo
            subject: subject,//Abreviación
            html: message // El cuerpo del mensaje
        });
        console.log("Mensaje enviado:", info.messageId);
        console.log((info) ? true : false)
    }


    // --- MÉTODOS PRIVADOS ---
    async buildPlantilla(emailSend: SendEmailDTO) {
        // Traemos el html de la plantilla
        const view = fs.readFileSync(process.cwd() + `${emailSend.pathTemplate}`, { encoding: 'utf8', flag: 'r' }).toString();
        // Reemplazamos los valores dinámicos
        const viewHTML = await this.replaceVariables(view, emailSend.parameters);
        return viewHTML;
    }

    async replaceVariables(valor: any, parametros: any) {
        valor = valor.replace(/{APP_NAME}/ig, VARIABLES.APP_NAME);
        valor = valor.replace(/{URL_FRONTEND}/ig, VARIABLES.APP_URL_FRONT);
        // Reemplazamos los valores pasados como paremetros en la plantilla
        for (var [key, value] of Object.entries(parametros)) {
            valor = valor.replace(new RegExp("{" + key + "}", "ig"), value);
        }
        return valor;
    }
}