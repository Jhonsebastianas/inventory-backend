export class SimpleLoginOutDTO {
    token: string;
    names: string;
    grants: string[];
}

export class SimpleLoginOutDTOBuilder {

    private readonly _simpleLoginOutDTO: SimpleLoginOutDTO;

    constructor() {
        this._simpleLoginOutDTO = {
            token: null,
            names: null,
            grants: [],
        };
    }

    whitToken(token: string): SimpleLoginOutDTOBuilder {
        this._simpleLoginOutDTO.token = token;
        return this;
    }

    whitNames(names: string): SimpleLoginOutDTOBuilder {
        this._simpleLoginOutDTO.names = names;
        return this;
    }

    whitGrants(grants: string[]): SimpleLoginOutDTOBuilder {
        this._simpleLoginOutDTO.grants = grants;
        return this;
    }

    build(): SimpleLoginOutDTO {
        return this._simpleLoginOutDTO;
    }
}