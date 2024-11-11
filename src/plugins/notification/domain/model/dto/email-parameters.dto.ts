export class EmailParameters {
    userNames: string;
    email: string;
    otpCode: string;
}


export class EmailParametersBuilder {
    private readonly _emailParameters: EmailParameters;

    constructor() {
        this._emailParameters = {
            userNames: '',
            email: '',
            otpCode: '',
        };
    }

    withUserNames(userNames: string): EmailParametersBuilder {
        this._emailParameters.userNames = userNames;
        return this;
    }
    
    withEmail(email: string): EmailParametersBuilder {
        this._emailParameters.email = email;
        return this;
    }

    withOtpCode(otpCode: string): EmailParametersBuilder {
        this._emailParameters.otpCode = otpCode;
        return this;
    }

    build(): EmailParameters {
        return this._emailParameters;
    }

}