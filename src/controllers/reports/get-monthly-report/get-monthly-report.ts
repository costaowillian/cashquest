import { IMonthlyRepost } from "../../../models/monthly-report";
import { ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { GetMonthlyReportParams, IGetMonthlyReportRepoisitory } from "./protocols";

export class GetMonthlyReportController implements Icontroller {

    constructor(
        private readonly getMonthlyReportRepository: IGetMonthlyReportRepoisitory
      ) {}
    async handle(httpRequest: HttpRequest<GetMonthlyReportParams>): Promise<HttpResponse<unknown>> {
        try {
            const body = httpRequest?.body;

            if(!body) {
                return serverError("Missing Id");
            }

            const deposits = await this.getMonthlyReportRepository.getMonthlyReport(body, "deposit");
            const savings = await this.getMonthlyReportRepository.getMonthlyReport(body, "saving");
            const spendings = await this.getMonthlyReportRepository.getMonthlyReport(body,"spending");

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