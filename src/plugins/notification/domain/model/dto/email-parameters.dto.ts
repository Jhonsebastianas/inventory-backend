export class EmailParameters {
    userName: string;
    email: string;
    otpCode: string;
}


export class EmailParametersBuilder {
    private readonly _emailParameters: EmailParameters;

    constructor() {
        this._emailParameters = {
            userName: '',
            email: '',
            otpCode: '',
        };
    }

    withUserName(userName: string): EmailParametersBuilder {
        this._emailParameters.userName = userName;
        return this;
    }
    
    withEmail(email: string): EmailParametersBuilder {
        this._emailParameters.email = email;
        return this;
    }

}