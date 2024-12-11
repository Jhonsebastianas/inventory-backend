import { ResponseDTO } from "@core/domain/response.dto";
import { ProductRegisterDTO } from "../model/dto/product-register.dto";
import { ProductDTO } from "../model/dto/product.dto";

export interface ProductService {

    /**
     * Register a product to the application.
     * Created on 26/10/2024 at 09:54 p.m. <br>
     * 
     * @param { ProductRegisterDTO } productRegister product to register in the app.
     */
    registerProduct(productRegister: ProductRegisterDTO): Promise<ResponseDTO>;

    /**
     * Update one product by id
     * Created on 26/10/2024 at 09:57 p.m. <br>
     * 
     * @param { string } id id product
     * @param { ProductDTO } productUpdate product to update
     */
    updateProduct(id: string, productUpdate: ProductDTO): Promise<ResponseDTO>;

    /**
     * Delete product by id
     * Created on 26/10/2024 at 09:58 p.m. <br>
     * 
     * @param { string } id id product
     */
    deleteProduct(id: string): Promise<ResponseDTO>;

    /**
     * find all products
     * Created on 26/10/2024 at 09:54 p.m. <br>
     */
    findAll(): Promise<ProductDTO[]>

    /**
     * Find product by PK
     * Created on 26/10/2024 at 09:59 p.m. <br>
     * @param { string } id id product
     */
    findById(id: string): Promise<ProductDTO>;

    /**
     * find product name.
     * Created on 26/10/2024 at 09:54 p.m. <br>
     * 
     * @param { string } name user access
     */
    findByName(name: string): Promise<ProductDTO>;

    /**
     * find products like name.
     * Created on 26/10/2024 at 09:54 p.m. <br>
     * 
     * @param { string } name user access
     */
    findByLikeName(name: string): Promise<ProductDTO[]>;

    /**
     * Reduce stock's product
     * Created on 07/10/2024 at 06:29 p.m. <br>
     * 
     * @param id product identity
     * @param quantity quantity to add or less
     */
    reduceInventories(idProduct: string, quantity: number): Promise<void>;
    
}