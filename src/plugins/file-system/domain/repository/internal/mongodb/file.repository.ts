import { File } from "../../../model/document/file.document";

/**
 * Interface encargada de definir los métodos para la capa de datos de la entidad. <br>
 * Creado el 27/09/2024 a las 13:51:49. <br>
 *
 * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
 */
export interface FileMongoRepository {

    /**
     * Método encargado de insertar un registro en la entidad File <br>
     * Creado el 27/09/2024 a las 13:51:49. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { File } file
    */
    save(file: File): Promise<File>;

    /**
     * Método encargado de actualizar un registro en la entidad File <br>
     * Creado el 27/09/2024 a las 13:51:49. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { File } file
    */
    update(file: File): Promise<File>;

    /**
     * Método encargado de eliminar un registro en la entidad File <br>
     * Creado el 27/09/2024 a las 13:51:49. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { string } id
    */
    delete(id: string): Promise<void>;

    /**
     * Método encargado de encontrar un registro en la entidad File por su Id <br>
     * Creado el 27/09/2024 a las 13:51:49. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @return
    */
    findById(id: string): Promise<File>;

}