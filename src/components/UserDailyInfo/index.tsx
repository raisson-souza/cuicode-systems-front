import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import LocalStorage from "../../data/classes/LocalStorage"
import UserEndpoints from "../../services/UserEndpoints"

import { Base64 } from "../../functions/Formatting/Base64"
import { GetSystemStyle } from "../InitialFetch"
import IsNil from "../../functions/IsNil"
import ShouldFetch from "../../functions/Routes/ShouldFetch"

import { GetUserDailyInfoResponse } from "../../services/types/UserEndpointsProps"

import "./styles.css"

export default function UserDailyInfo() {
    const [ userDailyInfo, setUserDailyInfo ] = useState<GetUserDailyInfoResponse>({
        groups: [],
        solicitations: [],
        delayedSolicitations: [],
        chatsNumber: 0,
        dreamsNumber: 0,
        hestiaTasksThisWeekNumber: 0,
        hestiaPendingTasksNumber: 0,
        minervaOpenPlans: 0,
    })
    const systemStyle = GetSystemStyle()

    useEffect(() => {
        const fetchUserDailyInfo = async () => { // TODO: Refatorar conforme issue 20
            const userDailyInfoResponse = await UserEndpoints.getUserDailyInfo()

            if (userDailyInfoResponse.Success) {
                LocalStorage.SetUserDailyInfo(JSON.stringify(userDailyInfoResponse.Data))
                setUserDailyInfo(userDailyInfoResponse.Data)
            }
        }

        if (ShouldFetch({ // TODO: Refatorar conforme issue 20
            key: 'user_daily_info',
            time: 3,
        })) {
            fetchUserDailyInfo()
            return
        }

        const userDailyInfoLocalStorage = LocalStorage.GetUserDailyInfo()

        if (!IsNil(userDailyInfoLocalStorage)) setUserDailyInfo(userDailyInfoLocalStorage!)
    }, [])

    if (IsNil(userDailyInfo)) // TODO: Utilizar Skeleton
        return null

    return (
        <div
            className="user-daily-info"
            id="user-daily-info"
            style={{ backgroundColor: systemStyle.PrimaryColor }}
        >
            <p
                id="user-daily-info-title"
                style={{ fontSize: 24 }}
            >
                <b>Informações Diárias</b>
            </p>
            <div className="user-daily-info-content">
                <div
                    className="user-daily-info-group"
                    style={{ backgroundColor: systemStyle.SecondaryColor }}
                >
                    {
                        userDailyInfo!.groups.length > 0
                            ? (
                                <>
                                    <h3>MEUS GRUPOS</h3>
                                    <div className="user-daily-info-group-enclosure">
                                        {
                                            userDailyInfo.groups.map(group => (
                                                <div
                                                    key={ group.Id }
                                                    className="user-daily-info-link"
                                                    style={{ backgroundColor: systemStyle.TerciaryColor }}
                                                >
                                                    <p>
                                                        <Link to={ `/group/${ Base64.ToBase64(String(group.Id))}` }>
                                                            { group.Name }
                                                        </Link>
                                                    </p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                            )
                            : <h4>Nenhum grupo encontrado</h4>
                    }
                </div>
                <div
                    className="user-daily-info-group"
                    style={{ backgroundColor: systemStyle.SecondaryColor }}
                >
                    {
                        userDailyInfo.solicitations.length > 0
                            ? (
                                <>
                                    <h3>MINHAS SOLICITAÇÕES</h3>
                                    <div className="user-daily-info-group-enclosure">
                                        {
                                            userDailyInfo.solicitations.map(solicitation => (
                                                <div
                                                    key={ solicitation.Id }
                                                    className="user-daily-info-link"
                                                    style={{ backgroundColor: systemStyle.TerciaryColor }}
                                                >
                                                    <p><Link to={ `/solicitation/${ Base64.ToBase64(String(solicitation.Id))}` }>{ solicitation.Name }</Link></p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                            )
                            : <h4>Nenhuma solicitação encontrada</h4>
                    }
                </div>
                <div
                    className="user-daily-info-group"
                    style={{ backgroundColor: systemStyle.SecondaryColor }}
                >
                    {
                        userDailyInfo.delayedSolicitations.length > 0
                            ? (
                                <>
                                    <h3>MINHAS SOLICITAÇÕES ATRASADAS</h3>
                                    <div className="user-daily-info-group-enclosure">
                                        {
                                            userDailyInfo.delayedSolicitations.map(delayedSolicitation => (
                                                <div
                                                    key={ delayedSolicitation.Id }
                                                    className="user-daily-info-link"
                                                    style={{ backgroundColor: systemStyle.TerciaryColor }}
                                                >
                                                    <p><Link to={ `/solicitation/${ Base64.ToBase64(String(delayedSolicitation.Id))}` }>{ delayedSolicitation.Name }</Link></p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                            )
                            : <h4>Nenhuma solicitação atrasada encontrada</h4>
                    }
                </div>
                <div
                    className="user-daily-info-group user-daily-info-numbers"
                    style={{ backgroundColor: systemStyle.SecondaryColor }}
                >
                    {
                        userDailyInfo.chatsNumber > 0
                            ? <Link to={"/chats"}><p>{ userDailyInfo.chatsNumber } { userDailyInfo.chatsNumber === 1 ? "CHAT" : "CHATS" }</p></Link>
                            : <Link to={"/chats"}><p>Nenhum chat.</p></Link>
                    }
                    {
                        userDailyInfo.dreamsNumber > 0
                            ? <Link to={"/morfeus"}><p>{ userDailyInfo.dreamsNumber } { userDailyInfo.dreamsNumber === 1 ? "SONHO" : "SONHOS" }</p></Link>
                            : <Link to={"/morfeus"}><p>Nenhum sonho.</p></Link>
                    }
                    {
                        userDailyInfo.hestiaTasksThisWeekNumber > 0
                            ? <Link to={"/hestia"}><p>{ userDailyInfo.hestiaTasksThisWeekNumber } { userDailyInfo.hestiaTasksThisWeekNumber === 1 ? "TAREFA" : "TAREFAS" } PARA A SEMANA</p></Link>
                            : <Link to={"/hestia"}><p>Nenhuma tarefa para a semana.</p></Link>
                    }
                    {
                        userDailyInfo.hestiaPendingTasksNumber > 0
                            ? <Link to={"/hestia"}><p>{ userDailyInfo.hestiaPendingTasksNumber } { userDailyInfo.hestiaPendingTasksNumber === 1 ? "TAREFA ATRASADA" : "TAREFAS ATRASADAS" }</p></Link>
                            : <Link to={"/hestia"}><p>Nenhuma tarefa atrasada.</p></Link>
                    }
                    {
                        userDailyInfo.minervaOpenPlans > 0
                            ? <Link to={"/minerva"}><p>{ userDailyInfo.minervaOpenPlans } { userDailyInfo.minervaOpenPlans === 1 ? "PLANO" : "PLANOS" }</p></Link>
                            : <Link to={"/minerva"}><p>Nenhum plano.</p></Link>
                    }
                </div>
            </div>
        </div>
    )
}