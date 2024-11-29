import { IdentificationDocumentDTO } from "@core/domain/identification-document.dto";
import { Client } from "../../model/document/client.document";

/**
 * Interface in charge of defining the methods for the entity's data layer. <br>
 * Created on date 29/11/2024 at 00:03:02. <br>
 *
 * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
 */
export interface ClientRepository {

    /**
     * Method in charge of inserting a record in the Client entity <br>
     * Created on date 29/11/2024 at 00:03:02. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { Client } client
    */
    save(client: Client): Promise<Client>;

    /**
     * Method in charge of updating a record in the Client entity. <br>
     * Created on date 29/11/2024 at 00:03:02. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { Client } client
    */
    update(client: Client): Promise<Client>;

    /**
     * Method in charge of deleting a record in the Client entity <br>
     * Created on date 29/11/2024 at 00:03:02. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { string } id
    */
    delete(id: string): Promise<void>;

    /**
     * Method in charge of finding a record in the Client entity by its Id. <br>
     * Created on date 29/11/2024 at 00:03:02. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { string } id
     * @return
    */
    findById(id: string): Promise<Client>;

    /**
     * find client by identification
     * 
     * @param { IdentificationDocumentDTO } identification identification of client
     */
    findByIdentification(identification: IdentificationDocumentDTO): Promise<Client>;

}