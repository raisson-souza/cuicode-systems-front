type GetUserDailyInfoResponse = {
    groups : {
        Id : number
        Name : string
    }[]
    solicitations : {
        Id : number
        Name : string
    }[]
    delayedSolicitations : {
        Id : number
        Name : string
    }[]
    chatsNumber : number
    dreamsNumber : number
    hestiaTasksThisWeekNumber : number
    hestiaPendingTasksNumber : number
    minervaOpenPlans : number
}

export type {
    GetUserDailyInfoResponse,
}