import { Counter } from "@core/domain/model/document/counter.document";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class CounterServiceImpl {
    constructor(
        @InjectModel(Counter.name) private counterModel: Model<Counter>,
    ) { }

    async getNextSequence(name: string): Promise<number> {
        const sequenceDocument = await this.counterModel.findOneAndUpdate(
            { name },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true },
        );
        return sequenceDocument.sequenceValue;
    }
}