import { Business } from "../../model/document/business.document";

/**
 * Interface in charge of defining the methods for the entity's data layer. <br>
 * Created on date 24/10/2024 at 10:47:49. <br>
 *
 * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
 */
export interface BusinessRepository {

    /**
     * Method in charge of inserting a record in the Business entity <br>
     * Created on date 24/10/2024 at 10:47:49. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { Business } business
    */
    save(business: Business): Promise<Business>;

    /**
     * Method in charge of updating a record in the Business entity. <br>
     * Created on date 24/10/2024 at 10:47:49. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { Business } business
    */
    update(business: Business): Promise<Business>;

    /**
     * Method in charge of deleting a record in the Business entity <br>
     * Created on date 24/10/2024 at 10:47:49. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { string } id
    */
    delete(id: string): Promise<void>;

    /**
     * Method in charge of finding a record in the Business entity by its Id. <br>
     * Created on date 24/10/2024 at 10:47:49. <br>
     *
     * @author <a href="https://www.jhonsebastianas.com/">Sebastian Agudelo</a></br>
     * @param { string } id
     * @return
    */
    findById(id: string): Promise<Business>;

    /**
     * find business by owner id
     * @param { string } ownerId user owner id
     */
    findByOwnerId(ownerId: string): Promise<Business>;

    /**
     * Find business by employee id
     * @param { string } employeeId employe identifier
     */
    findByEmployeeId(employeeId: string): Promise<Business>;

}