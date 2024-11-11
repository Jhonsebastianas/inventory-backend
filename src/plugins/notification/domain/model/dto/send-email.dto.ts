import { EmailParameters } from "./email-parameters.dto";

export class SendEmailDTO {
    parameters: EmailParameters;
    recipientEmails: string[];
}


export class SendEmailDTOBuilder {
    private readonly _sendEmailDto: SendEmailDTO;

    constructor() {
        this._sendEmailDto = {
            parameters: new EmailParameters(),
            recipientEmails: [],
        };
    }

    withParameters(parameters: EmailParameters): SendEmailDTOBuilder {
        this._sendEmailDto.parameters = parameters;
        return this;
    }

    withRecipientEmails(recipientEmails: string[]): SendEmailDTOBuilder {
        this._sendEmailDto.recipientEmails = recipientEmails;
        return this;
    }
}