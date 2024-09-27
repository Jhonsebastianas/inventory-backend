import { MovementsFinancial } from "@financial-register/domain/model/document/movements-financial.document";

export interface MovementsFinancialRepository {

    /**
     * MovementsFinancial to register.
     * Created on 22/04/2024 at 07:10:59. <br>
     * 
     * @param movementsFinancial registers a MovementsFinancial in the database
     */
    save(movementsFinancial: MovementsFinancial): Promise<MovementsFinancial>;

    /**
     * MovementsFinancial to update
     * Created on 22/04/2024 at 10:00:48. <br>
     * 
     * @param movementsFinancial update a MovementsFinancial in database.
     */
    update(movementsFinancial: MovementsFinancial): Promise<MovementsFinancial>;

    /**
     * MovementsFinancial to delete.
     * Created on 22/04/2024 at 10:28:38. <br>
     * 
     * @param idMovementsFinancial MovementsFinancial id.
     */
    delete(idMovementsFinancial: string): Promise<void>;

    /**
     * Find MovementsFinancial by id.
     * Created on 22/04/2024 at 07:13:47. <br>
     * 
     * @param id MovementsFinancial id.
     */
    findById(id: string): Promise<MovementsFinancial>;

    /**
     * Find all user movements.
     * Created on 26/04/2024 at 15:01:37. <br>
     * 
     * @param idUser user id.
     */
    findAllUser(idUser: string): Promise<MovementsFinancial[]>;

    /**
     * find movements of user by month and year
     * Created on 26/04/2024 at 15:13:06. <br>
     * 
     * @param month month of movements
     * @param year year of movements
     * @param idUser id user
     */
    findByMonthAndYearAndUser(month: string, year: string, idUser: string): Promise<MovementsFinancial>;

}