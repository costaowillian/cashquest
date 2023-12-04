import { IAchievements } from "../../models/achievements";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../protocols";
import {
  IGetSumSavingsRepository,
  IGetSumSpendingsRepository
} from "../user-pet/create-user-pet/protocols";
import conquistasDespesas from "../../data/achievements/spendings_achievements.json";
import conquistasPoupanca from "../../data/achievements/savings_achievements.json";
import { IAchievementsParams } from "./protocols";

export class GetAchievementsController implements Icontroller {
  constructor(
    private readonly getSumSpendingRepository: IGetSumSpendingsRepository,
    private readonly getSumSavingsRepository: IGetSumSavingsRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<IAchievementsParams>
  ): Promise<HttpResponse<IAchievements | string>> {
    try {
      const id = httpRequest?.body?.id;
      const type = httpRequest?.body?.type;

      if (!id || !type) {
        return badRequest("missing fields");
      }

      const sumSpendings: any =
        await this.getSumSpendingRepository.getSumSpendings(id);
      const sumSavings: any =
        await this.getSumSavingsRepository.getSumSavings(id);

      let achievement: IAchievements | null;
      if (type == "poupanca") {
        achievement = this.getAchievement(sumSavings, conquistasPoupanca);
      } else if (type == "despesas") {
        achievement = this.getAchievement(sumSpendings, conquistasDespesas);
      } else {
        return badRequest('type can be "despesas" or "poupanca"');
      }

      return ok<IAchievements>(achievement);
    } catch (error) {
      return serverError("32");
    }
  }

  private getAchievement(total: number, achievementType: any): any {
    for (const achievementId in achievementType) {
      const achievement = achievementType[achievementId];
      for (const ac of achievement) {
        if (ac.condicao == total) {
          const result = {
            name: ac.nome,
            img: ac.img
          };
          return result;
        }
      }
    }
    return null;
  }
}
