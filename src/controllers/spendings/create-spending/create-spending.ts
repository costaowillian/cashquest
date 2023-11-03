import { ObjectId } from "mongodb";
import { ISpending } from "../../../models/spending";
import { badRequest, created, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { CreateSpendingParams, ICreateSpendingRepository } from "./protocols";
import { CreateInstallmentsSpendingController } from "./create-spending-installments";

export class CreateSpendingController implements Icontroller {
  private createInstallmentsSpendingController: CreateInstallmentsSpendingController;
  
  constructor(
    private readonly createSpendingRepository: ICreateSpendingRepository
  ) {
    this.createInstallmentsSpendingController =
      new CreateInstallmentsSpendingController(createSpendingRepository);
  }

  async handle(
    httpRequest: HttpRequest<CreateSpendingParams>
  ): Promise<HttpResponse<ISpending | string>> {
    try {
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing Body");
      }

      const validationError = this.validateRequiredFields(body);

      if (validationError) {
        return validationError;
      }

      const spendingData = this.preparespendingData(body);

      if (body.installments && body.installments > 1) {
        if(body.isFixed){
        const installmentsDeposits =
          await this.createInstallmentsSpendingController.handle(
            spendingData
          );

        if (installmentsDeposits) {
          return created<ISpending>(installmentsDeposits);
        } else {
          return serverError("12");
        }
        } else {
          return badRequest("Missing fields");
        }
      } else {
        const deposit = await this.createSpendingRepository.createSpending(
          spendingData
        );
        return created<ISpending>(deposit);
      }
    } catch (error) {
      console.log(error);
      return serverError("07");
    }
  }

  private validateRequiredFields(body: CreateSpendingParams): HttpResponse<ISpending| string> | undefined {
    const requiredFields = ["_userId", "category", "value", "isFixed", "createAt", "isTransferred"];
    for (const field of requiredFields) {
      const fieldValue = body?.[field as keyof CreateSpendingParams];
      if (fieldValue === undefined || (typeof fieldValue === "string" && !fieldValue.trim())) {
        return badRequest(`Field ${field} is required`);
      }
    }
    return undefined;
  }

  private preparespendingData(body: CreateSpendingParams): CreateSpendingParams {
    const spendingData = { ...body };
    spendingData._userId = new ObjectId(body._userId);
    spendingData.createAt = new Date(body.createAt);
    return spendingData;
  }

}