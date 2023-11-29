import { ObjectId } from "mongodb";
import { IDeposit } from "../../../models/deposit";
import { badRequest, created, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { CreateDepositParams, ICreateDepositRepository } from "./protocols";
import { CreateInstallmentsDepositsController } from "./create-deposits-installments";

export class CreateDepositController implements Icontroller {
  private createInstallmentsDepositsController: CreateInstallmentsDepositsController;
  constructor(
    private readonly createDepositRepository: ICreateDepositRepository
  ) {
    this.createInstallmentsDepositsController =
      new CreateInstallmentsDepositsController(createDepositRepository);
  }

  async handle(
    httpRequest: HttpRequest<CreateDepositParams>
  ): Promise<HttpResponse<IDeposit | string>> {
    try {
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing Body");
      }

      const validationError = this.validateRequiredFields(body);

      if (validationError) {
        return validationError;
      }

      const depositData = this.prepareDepositData(body);

      if (body.installments && body.installments > 1) {
        if(body.isFixed){
        const installmentsDeposits =
          await this.createInstallmentsDepositsController.handle(
            depositData
          );

        if (installmentsDeposits) {
          return created<IDeposit>(installmentsDeposits);
        } else {
          return serverError("12");
        }
        } else {
          return badRequest("Missing fields");
        }
      } else {
        const deposit = await this.createDepositRepository.createDeposit(
          depositData
        );
        return created<IDeposit>(deposit);
      }
    } catch (error) {
      return serverError("12");
    }
  }

 private validateRequiredFields(body: CreateDepositParams): HttpResponse<IDeposit | string> | undefined {
    const requiredFields = ["_userId", "category", "value", "isFixed", "createAt"];
    for (const field of requiredFields) {
      const fieldValue = body?.[field as keyof CreateDepositParams];
      if (fieldValue === undefined || (typeof fieldValue === "string" && !fieldValue.trim())) {
        return badRequest(`Field ${field} is required`);
      }
    }
    return undefined;
  }

  private prepareDepositData(body: CreateDepositParams): CreateDepositParams {
    const depositData = { ...body };
    depositData._userId = new ObjectId(body._userId);
    return depositData;
  }
}
