import conquistasDespesas from "../../../data/achievements/spendings_achievements.json";
import conquistasPoupanca from "../../../data/achievements/savings_achievements.json";
import { type } from "os";
import { IAchievements } from "../../../models/achievements";
import { badRequest, ok, serverError } from "../../helpers";
import { Icontroller, HttpRequest, HttpResponse } from "../../protocols";
import {
  IGetSumSpendingsRepository,
  IGetSumSavingsRepository
} from "../../user-pet/create-user-pet/protocols";

export class GetAllAchievementsController implements Icontroller {
  constructor(
    private readonly getSumSpendingRepository: IGetSumSpendingsRepository,
    private readonly getSumSavingsRepository: IGetSumSavingsRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<IAchievements[] | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id || !type) {
        return badRequest("missing fields");
      }

      const sumSpendings: any =
        await this.getSumSpendingRepository.getSumSpendings(id);
      const sumSavings: any =
        await this.getSumSavingsRepository.getSumSavings(id);

      const achievement: IAchievements[] = [];
      achievement.push(this.getAchievement(sumSpendings, conquistasPoupanca));
      achievement.push(this.getAchievement(sumSavings, conquistasDespesas));

      return ok<IAchievements[]>(achievement);
    } catch (error) {
      return serverError("33");
    }
  }

  private getAchievement(total: number, achievementType: any): any {
    const arrayAchievement = [];
    for (const achievementId in achievementType) {
      const achievements = achievementType[achievementId];
      for (const achievement of achievements) {
        if (achievement.condicao < total) {
          const result = {
            name: achievement.nome,
            img: achievement.img
          };
          arrayAchievement.push(result);
        }
      }
    }
    return arrayAchievement;
  }
}
