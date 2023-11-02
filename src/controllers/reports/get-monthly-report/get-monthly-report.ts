import { IMonthlyRepost } from "../../../models/monthly-report";
import { ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IGetMonthlyReportRepoisitory } from "./protocols";

export class GetMonthlyReportController implements Icontroller {

    constructor(
        private readonly getMonthlyReportRepository: IGetMonthlyReportRepoisitory
      ) {}
    async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
        try {
            const id = httpRequest?.params.id;

            if(!id) {
                return serverError("Missing Id");
            }

            const deposits = await this.getMonthlyReportRepository.getMonthlyReport(id, "deposit");
            const savings = await this.getMonthlyReportRepository.getMonthlyReport(id, "saving");
            const spendings = await this.getMonthlyReportRepository.getMonthlyReport(id,"spending");

            const data = {
                depoists: deposits || [],
                savings: savings || [],
                spandings: spendings|| []
            }

            return ok<IMonthlyRepost>(data);
        } catch (error) {
            console.log(error);
            return serverError("27");
        }
    }
  

}