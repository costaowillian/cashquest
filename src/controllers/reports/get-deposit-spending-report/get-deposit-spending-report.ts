import { IReport } from "../../../models/report";
import { ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { GetReportParams, IGetReportRepoisitory } from "./protocol";

export class GetReportController implements Icontroller {

    constructor(
        private readonly getReportRepository: IGetReportRepoisitory
      ) {}
    async handle(httpRequest: HttpRequest<GetReportParams>): Promise<HttpResponse<unknown>> {
        try {
            const body = httpRequest?.body;

            if(!body) {
                return serverError("Missing fields");
            }

            const deposits = await this.getReportRepository.getReport(body, "deposit");
            const spendings = await this.getReportRepository.getReport(body,"spending");

            const data = {
                depoists: deposits || [],
                spandings: spendings|| []
            }

            return ok<IReport>(data);
        } catch (error) {

            return serverError("28");
        }
    }
  

}