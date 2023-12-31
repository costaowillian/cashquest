import { ISpending } from "../../../models/spending";
import { ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { GetReportParams, IGetReportRepoisitory } from "../get-deposit-spending-report/protocol";


export class GetSpendingReportController implements Icontroller {

    constructor(
        private readonly getReportRepository: IGetReportRepoisitory
      ) {}
    async handle(httpRequest: HttpRequest<GetReportParams>): Promise<HttpResponse<ISpending[]| string>> {
        try {
            const body = httpRequest?.body;

            if(!body) {
                return serverError("Missing fields");
            }

            const spendings = await this.getReportRepository.getReport(body,"saving");

            return ok<ISpending[]>(spendings || []);
        } catch (error) {
            console.log(error);
            return serverError("29");
        }
    }
  

}