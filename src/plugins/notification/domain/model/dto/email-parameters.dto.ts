export class EmailParameters {
    currentStock: string;
    userNames: string;
    email: string;
    otpCode: string;
    productName: string;
    quantityStockReplenished: string;
}


export class EmailParametersBuilder {
    private readonly _emailParameters: EmailParameters;

    constructor() {
        this._emailParameters = {
            currentStock: '',
            userNames: '',
            email: '',
            otpCode: '',
            productName: '',
            quantityStockReplenished: '',
        };
    }

    withCurrentStock(currentStock: string): EmailParametersBuilder {
        this._emailParameters.currentStock = currentStock;
        return this;
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

    withProductName(productName: string): EmailParametersBuilder {
        this._emailParameters.productName = productName;
        return this;
    }

    withQuantityStockReplenished(quantityStockReplenished: string): EmailParametersBuilder {
        this._emailParameters.quantityStockReplenished = quantityStockReplenished;
        return this;
    }

    build(): EmailParameters {
        return this._emailParameters;
    }

}