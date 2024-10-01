import { Sale } from "../../../model/document/sale.document";
import { SaleDTO } from "../../../model/dto/sale.dto";

/**
 * Interface encargada de definir los métodos para la capa de datos de la entidad. <br>
 * Creado el 27/09/2024 a las 15:09:16. <br>
 *
 * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
 */
export interface SaleMongoRepository {

    /**
     * Método encargado de insertar un registro en la entidad Sale <br>
     * Creado el 27/09/2024 a las 15:09:16. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { Sale } Sale
    */
    save(sale: Sale): Promise<Sale>;

    /**
     * Método encargado de actualizar un registro en la entidad Sale <br>
     * Creado el 27/09/2024 a las 15:09:16. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { Sale } Sale
    */
    update(sale: Sale): Promise<Sale>;

    /**
     * Método encargado de eliminar un registro en la entidad Sale <br>
     * Creado el 27/09/2024 a las 15:09:16. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { string } id
    */
    delete(id: string): Promise<void>;

    /**
     * Método encargado de encontrar un registro en la entidad Sale por su Id <br>
     * Creado el 27/09/2024 a las 15:09:16. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { string } id
     * @return
    */
    findById(id: string): Promise<Sale>;

    /**
     * Encuentra todas las ventas registradas en el sistema.
     */
    findAll(): Promise<Sale[]>;

}