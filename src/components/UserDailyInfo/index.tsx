import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import env from "../../config/Env"

import { GetSystemStyle } from "../InitialFetch"

import LocalStorage from "../../data/classes/LocalStorage"
import UserEndpoints from "../../services/UserEndpoints"

import { Base64 } from "../../functions/Formatting/Base64"
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
        minervaOpenPlans: 0
    })
    const systemStyle = GetSystemStyle()

    useEffect(() => {
        const fetchUserDailyInfo = async () => {
            const userDailyInfoResponse = await UserEndpoints.getUserDailyInfo()

            if (env.Environment() === 'testing') { // DADOS MOCKADOS!
                const MOCK : GetUserDailyInfoResponse = {
                    groups: [
                        {
                            Id: 12,
                            Name: 'Amigos do Clube'
                        },
                        {
                            Id: 22,
                            Name: 'Colegas de Trabalho'
                        }
                    ],
                    solicitations: [
                        {
                            Id: 21,
                            Name: 'Pagar fulana'
                        },
                        {
                            Id: 32,
                            Name: 'Agendar consulta no oftalmo'
                        },
                        {
                            Id: 44,
                            Name: 'Entrar em contato com organizadores da festa'
                        }
                    ],
                    delayedSolicitations: [
                        {
                            Id: 57,
                            Name: 'Levar carro na oficina'
                        }
                    ],
                    chatsNumber: 5,
                    dreamsNumber: 17,
                    hestiaTasksThisWeekNumber: 3,
                    hestiaPendingTasksNumber: 1,
                    minervaOpenPlans: 7
                }

                LocalStorage.SetUserDailyInfo(JSON.stringify(MOCK))
                setUserDailyInfo(MOCK)
                return
            }

            if (userDailyInfoResponse.Success) {
                LocalStorage.SetUserDailyInfo(JSON.stringify(userDailyInfoResponse.Data))
                setUserDailyInfo(userDailyInfoResponse.Data)
            }
        }

        if (ShouldFetch({
            key: 'user_daily_info',
            time: 3,
        })) {
            fetchUserDailyInfo()
            return
        }

        const userDailyInfoLocalStorage = LocalStorage.GetUserDailyInfo()

        if (!IsNil(userDailyInfoLocalStorage)) setUserDailyInfo(userDailyInfoLocalStorage!)
    }, [])

    if (IsNil(userDailyInfo))
        return null

    return (
        <div
            className="user-daily-info"
            style={{
                backgroundColor: systemStyle.PrimaryColor
            }}
        >
            <div
                className="user-daily-info-group"
                style={{
                    backgroundColor: systemStyle.SecondaryColor
                }}
            >
                {
                    userDailyInfo!.groups.length > 0
                        ? (
                            <>
                                <h3>Meus Grupos</h3>
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
                style={{
                    backgroundColor: systemStyle.SecondaryColor
                }}
            >
                {
                    userDailyInfo.solicitations.length > 0
                        ? (
                            <>
                                <h3>Minhas Solicitações</h3>
                                <div className="user-daily-info-group-enclosure">
                                    {
                                        userDailyInfo.solicitations.map(solicitation => (
                                            <div
                                                key={ solicitation.Id }
                                                className="user-daily-info-link"
                                                style={{
                                                    backgroundColor: systemStyle.TerciaryColor
                                                }}
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
                style={{
                    backgroundColor: systemStyle.SecondaryColor
                }}
            >
                {
                    userDailyInfo.delayedSolicitations.length > 0
                        ? (
                            <>
                                <h3>Minhas Solicitações Atrasadas</h3>
                                <div className="user-daily-info-group-enclosure">
                                    {
                                        userDailyInfo.delayedSolicitations.map(delayedSolicitation => (
                                            <div
                                                key={ delayedSolicitation.Id }
                                                className="user-daily-info-link"
                                                style={{
                                                    backgroundColor: systemStyle.TerciaryColor
                                                }}
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
                style={{
                    backgroundColor: systemStyle.SecondaryColor
                }}
            >
                {
                    userDailyInfo.chatsNumber > 0
                        ? <Link to={"/chats"}><p>Chats que estou incluido: <b>{ userDailyInfo.chatsNumber }</b></p></Link>
                        : <Link to={"/chats"}><p>Nenhum chat.</p></Link>
                }
                {
                    userDailyInfo.dreamsNumber > 0
                        ? <Link to={"/morfeus"}><p>Meus sonhos: <b>{ userDailyInfo.dreamsNumber }</b></p></Link>
                        : <Link to={"/morfeus"}><p>Nenhum sonho cadastrado.</p></Link>
                }
                {
                    userDailyInfo.hestiaTasksThisWeekNumber > 0
                        ? <Link to={"/hestia"}><p>Tarefas desta semana: <b>{ userDailyInfo.hestiaTasksThisWeekNumber }</b></p></Link>
                        : <Link to={"/hestia"}><p>Nenhuma tarefa para essa semana</p></Link>
                }
                {
                    userDailyInfo.hestiaPendingTasksNumber > 0
                        ? <Link to={"/hestia"}><p>Tarefas atrasadas: <b>{ userDailyInfo.hestiaPendingTasksNumber }</b></p></Link>
                        : <Link to={"/hestia"}><p>Nenhuma tarefa atrasada</p></Link>
                }
                {
                    userDailyInfo.minervaOpenPlans > 0
                        ? <Link to={"/minerva"}><p>Planos em aberto: <b>{ userDailyInfo.minervaOpenPlans }</b></p></Link>
                        : <Link to={"/minerva"}><p>Nenhum plano</p></Link>
                }
            </div>
        </div>
    )
}