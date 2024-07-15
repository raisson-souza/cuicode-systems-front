import DefaultSystemStyle from "../data/defaultStyle"

import SystemStyle from "../data/classes/SystemStyle"
import Endpoints from "./base/Endpoints"

import AuthorizationTypeEnum from "../data/enums/AuthorizationTypeEnum"

export default abstract class SystemEndpoints extends Endpoints
{
    static async GetStyle() {
        const response = await this.Get<any>({
            url: "/system/get_style",
            authorizationType: AuthorizationTypeEnum.System
        })

        if (response.Success)
            return new SystemStyle(response.Data)

        return new SystemStyle(DefaultSystemStyle)
    }

    static async VerifySystemMaintence() {
        return await this.Get<string | null>({
            url: "/system/ok",
            authorizationType: AuthorizationTypeEnum.System
        })
    }

    static async GetForm(form : string) {
        return await this.Get<any>({
            url: `/system/get_form/${ form }`,
            authorizationType: AuthorizationTypeEnum.System
        })
    }
}