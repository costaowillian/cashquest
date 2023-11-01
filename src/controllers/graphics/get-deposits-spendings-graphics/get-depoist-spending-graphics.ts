import { IMonthGraphicData } from "../../../models/graphicData";
import { badRequest, ok } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IGetSpandingAndDepositGraphicRepository, SpandingAndDepositGraphicParams } from "./protocols";

export class GetDepositSpendingGraphicController implements Icontroller {
    
    constructor(
        private readonly getSpendingDepositGraphicRepository: IGetSpandingAndDepositGraphicRepository
    ){}

    async handle(httpRequest: HttpRequest<SpandingAndDepositGraphicParams>): Promise<HttpResponse<IMonthGraphicData | string>> {
        try {
            const body = httpRequest?.body;

            if(!body) {
                return badRequest("Missing Fields");
            }

            const validationError = this.validateRequiredFields(body);

            if (validationError) {
              return validationError;
            }

            const data = this.prepareDepositData(body);

            let deposits = await this.getSpendingDepositGraphicRepository.getSpandingAndDepositGraphic(data, "deposit");

            if(!deposits) {
                deposits = 0;
            }

            let spendings = await this.getSpendingDepositGraphicRepository.getSpandingAndDepositGraphic(data, "spending");

            if(!spendings) {
                spendings = 0;
            }

            const graphicData = {
                depositsTotal: deposits.total,
                spendingsTotal: spendings.total,
            }
            
            return ok<IMonthGraphicData>(graphicData);
        } catch (error) {
            return badRequest("26");
        }
    }

    private validateRequiredFields(body: SpandingAndDepositGraphicParams): HttpResponse<any | string> | undefined {
        const requiredFields = ["userId", "startDate", "endDate"];
        for (const field of requiredFields) {
          const fieldValue = body?.[field as keyof SpandingAndDepositGraphicParams];
          if (fieldValue === undefined || (typeof fieldValue === "string" && !fieldValue.trim())) {
            return badRequest(`Field ${field} is required`);
          }
        }
        return undefined;
    }

    private prepareDepositData(body: SpandingAndDepositGraphicParams): SpandingAndDepositGraphicParams {
        const data = { ...body };
        data.startDate = new Date(body.startDate);
        data.endDate = new Date(body.endDate);
        return data;
      }

}