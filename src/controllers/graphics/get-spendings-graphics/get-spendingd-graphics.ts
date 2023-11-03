import { IHowDidYouSpend } from "../../../models/how-did-you-spend";
import { badRequest, ok } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import {
  IGetSpendingsGraphicRepository,
  SpendingsGraphicParams
} from "./protocols";

export class GetSpendigsGraphicsController implements Icontroller {
  constructor(
    private readonly getSpendingGraphicsRepository: IGetSpendingsGraphicRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<SpendingsGraphicParams>
  ): Promise<HttpResponse<IHowDidYouSpend | string>> {
    try {
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing Fields");
      }

      const validationError = this.validateRequiredFields(body);

      if (validationError) {
        return validationError;
      }

      const data = this.prepareDepositData(body);

      let fixedSpendingsTotal =
        await this.getSpendingGraphicsRepository.getSpendingsGraphic(
          data,
          true,
          "spending"
        );

      if (!fixedSpendingsTotal) {
        fixedSpendingsTotal = 0;
      }

      let variableSpendingsTotal =
        await this.getSpendingGraphicsRepository.getSpendingsGraphic(
          data,
          false,
          "spending"
        );

      if (!variableSpendingsTotal) {
        variableSpendingsTotal = 0;
      }

      const savingsTotalFixed =
        await this.getSpendingGraphicsRepository.getSpendingsGraphic(
          data,
          false,
          "saving"
        );

      const savingsTotalNotFixed = await this.getSpendingGraphicsRepository.getSpendingsGraphic(
        data,
        false,
        "saving"
      );

      let savingsTotal = 0
      if (savingsTotalFixed || savingsTotalNotFixed ) {
        savingsTotal = savingsTotalFixed.total + savingsTotalNotFixed.total;
      }

      const graphicData = {
        fixedSpendingsTotal: fixedSpendingsTotal.total || 0,
        variableSpendingsTotal: variableSpendingsTotal.total || 0,
        savingsTotal: savingsTotal
      };

      return ok<IHowDidYouSpend>(graphicData);
    } catch (error) {
      return badRequest("27");
    }
  }

  private validateRequiredFields(
    body: SpendingsGraphicParams
  ): HttpResponse<any | string> | undefined {
    const requiredFields = ["userId", "startDate", "endDate"];
    for (const field of requiredFields) {
      const fieldValue = body?.[field as keyof SpendingsGraphicParams];
      if (
        fieldValue === undefined ||
        (typeof fieldValue === "string" && !fieldValue.trim())
      ) {
        return badRequest(`Field ${field} is required`);
      }
    }
    return undefined;
  }

  private prepareDepositData(
    body: SpendingsGraphicParams
  ): SpendingsGraphicParams {
    const data = { ...body };
    data.startDate = new Date(body.startDate);
    data.endDate = new Date(body.endDate);
    return data;
  }
}
