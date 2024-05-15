import Endpoints from "./base/Endpoints"

export default abstract class UserEndpoints extends Endpoints
{
    static async getUserDailyInfo() {
        return await this.Get<GetUserDailyInfoResponse>({
            url: '/user/daily_info',
            hasAuthorization: true
        })
    }
}

type GetUserDailyInfoResponse = {
    groupsIncluded : {
        Id : number
        Name : string
    }[]
    mySolicitations : {
        Id : number
        Name : string
    }[]
    myDelayedSolicitations : {
        Id : number
        Name : string
    }[]
    userParticipatingChats : number
    userDreams : number
    hestiaTasksThisWeek : number
    hestiaTasksPending : number
    minervaOpenPlans : number
}

export type {
    GetUserDailyInfoResponse
}