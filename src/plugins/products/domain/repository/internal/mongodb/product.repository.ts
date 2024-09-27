import { Product } from "../../../model/document/product.document";

export interface ProductMongoRepository {

    /**
     * Product to register.
     * Created on 26/09/2024 at 08:07 p.m. <br>
     * 
     * @param { Product } product registers a product in the database
     */
    save(product: Product): Promise<Product>;

    /**
     * Product to update
     * Created on 26/09/2024 at 08:07 p.m. <br>
     * 
     * @param { Product } product update a product in database.
     */
    update(product: Product): Promise<Product>;

    /**
     * Product to delete.
     * Created on 26/09/2024 at 08:07 p.m. <br>
     * 
     * @param { string } idProduct product id.
     */
    delete(idProduct: string): Promise<void>;

    /**
     * Find all product.
     * Created on 26/09/2024 at 08:07 p.m. <br>
     * 
     */
    findAll(): Promise<Product[]>;

    /**
     * Find product by id.
     * Created on 26/09/2024 at 08:07 p.m. <br>
     * 
     * @param id product id.
     */
    findById(id: string): Promise<Product>;

    /**
     * Find product by name.
     * Created on 26/09/2024 at 08:07 p.m. <br>
     * 
     * @param { string } name name of product.
     */
    findByName(name: string): Promise<Product>;

    /**
     * Find product like name.
     * Created on 26/09/2024 at 08:07 p.m. <br>
     * 
     * @param { string } name name of product.
     */
    findByLikeName(name: string): Promise<Product[]>;

}