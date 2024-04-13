import DefaultSystemStyle from "../data/defaultStyle"
import SystemStyle from "../data/classes/SystemStyle"

import Endpoints from "./base/Endpoints"

export default abstract class SystemEndpoints extends Endpoints
{
    static async GetStyle() {
        const response = await this.Get<any>({
            url: "/get_style",
            hasAuthorization: true
        })

        if (response.Success)
            return new SystemStyle(response.Data)

        return new SystemStyle(DefaultSystemStyle)
    }

    static async VerifySystemMaintence() {
        return await this.Get<string | null>({
            url: "/ok",
            hasAuthorization: true
        })
    }

    static async GetForm(form : string) {
        return await this.Get<any>({
            url: `/get_form/${ form }`,
            hasAuthorization: true
        })
    }
}