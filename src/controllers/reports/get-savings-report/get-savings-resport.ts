import { ISaving } from "../../../models/savings";
import { ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { GetReportParams, IGetReportRepoisitory } from "../get-deposit-spending-report/protocol";


export class GetSavingsReportController implements Icontroller {

    constructor(
        private readonly getReportRepository: IGetReportRepoisitory
      ) {}
    async handle(httpRequest: HttpRequest<GetReportParams>): Promise<HttpResponse<ISaving[]| string>> {
        try {
            const body = httpRequest?.body;

            if(!body) { 
                return serverError("Missing fields");
            }

            const savings = await this.getReportRepository.getReport(body,"spending");

            return ok<ISaving[]>(savings || []);
        } catch (error) {

            return serverError("30");
        }
    }
  

}