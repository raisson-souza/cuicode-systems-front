import AuthorizationTypeEnum from "../data/enums/AuthorizationTypeEnum"

import Endpoints from "./base/Endpoints"

import { GetUserDailyInfoResponse } from "./types/UserEndpointsProps"

export default abstract class UserEndpoints extends Endpoints
{
    static async getUserDailyInfo() {
        return await this.Get<GetUserDailyInfoResponse>({
            url: '/user/daily_info',
            authorizationType: AuthorizationTypeEnum.User
        })
    }
}