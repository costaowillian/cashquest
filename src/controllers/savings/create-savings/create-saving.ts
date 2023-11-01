import { ISaving } from "../../../models/savings";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { CreateSavingParams, ICreateSavingRepository } from "./protocols";
import { badRequest, created, serverError } from "../../helpers";
import { ObjectId } from "mongodb";
import { CreateInstallmentsSavingController } from "./create-savings-installments";

export class CreateSavingController implements Icontroller {
  private createInstallmentsSavingController: CreateInstallmentsSavingController;
  constructor(
    private readonly createSavingRepository: ICreateSavingRepository
  ) {
    this.createInstallmentsSavingController =
      new CreateInstallmentsSavingController(createSavingRepository);
  }

  async handle(
    httpRequest: HttpRequest<CreateSavingParams>
  ): Promise<HttpResponse<unknown>> {
    try {
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing Body");
      }

      const validationError = this.validateRequiredFields(body);

      if (validationError) {
        return validationError;
      }


      const savingData = this.prepareSavingsData(body);

      if (body.installments && body.installments > 1) {
        if(body.isFixed){
        const installmentsDeposits =
          await this.createInstallmentsSavingController.handle(
            savingData
          );

        if (installmentsDeposits) {
          return created<ISaving>(installmentsDeposits);
        } else {
          return serverError("12");
        }
        } else {
          return badRequest("Missing fields");
        }
      } else {
        const deposit = await this.createSavingRepository.createSaving(
          savingData
        );
        return created<ISaving>(deposit);
      }
    } catch (error) {
      return serverError("21");
    }
  }

  private validateRequiredFields(body: CreateSavingParams): HttpResponse<ISaving | string> | undefined {
    const requiredFields = ["_userId", "category", "value", "isFixed", "createAt"];
    for (const field of requiredFields) {
      const fieldValue = body?.[field as keyof CreateSavingParams];
      if (fieldValue === undefined || (typeof fieldValue === "string" && !fieldValue.trim())) {
        return badRequest(`Field ${field} is required`);
      }
    }
    return undefined;
  }

  private prepareSavingsData(body: CreateSavingParams): CreateSavingParams {
    const savingData = { ...body };
    savingData._userId = new ObjectId(body._userId);
    savingData.createAt = new Date(body.createAt);
    return savingData;
  }

}
