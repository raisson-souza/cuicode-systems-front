import SystemStyle from "../data/classes/SystemStyle";
import DefaultSystemStyle from "../data/defaultStyle";
import Endpoints from "./base/Endpoints";

export default abstract class SystemEndpoints extends Endpoints
{
    static async GetStyle() {
        try
        {
            const response = await this.Get("/get_style")

            return new SystemStyle(response.Data)
        }
        catch
        {
            return new SystemStyle(DefaultSystemStyle)
        }
    }

    static async VerifySystemMaintence() {
        try
        {
            const response = await this.Get("/ok")

            return !response.Success
        }
        catch
        {
            return true
        }
    }

    static async GetForm(form : string) {
        try
        {
            return await this.Get(`/get_form/${ form }`)
        }
        catch
        {
            return this.FailFetchResponse
        }
    }
}