import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import env from "../../config/Env"

import { GetSystemStyle } from "../InitialFetch"

import LocalStorage from "../../data/classes/LocalStorage"
import UserEndpoints, { GetUserDailyInfoResponse } from "../../services/UserEndpoints"

import { Base64 } from "../../functions/Formatting/Base64"
import IsNil from "../../functions/IsNil"
import ShouldFetch from "../../functions/Routes/ShouldFetch"

import "./styles.css"

export default function UserDailyInfo() {
    const [ userDailyInfo, setUserDailyInfo ] = useState<GetUserDailyInfoResponse>({
        groupsIncluded: [],
        mySolicitations: [],
        myDelayedSolicitations: [],
        userParticipatingChats: 0,
        userDreams: 0,
        hestiaTasksThisWeek: 0,
        hestiaTasksPending: 0,
        minervaOpenPlans: 0
    })
    const systemStyle = GetSystemStyle()

    useEffect(() => {
        const fetchUserDailyInfo = async () => {
            const userDailyInfoResponse = await UserEndpoints.getUserDailyInfo()

            if (env.Environment() === 'testing') { // DADOS MOCKADOS!
                const MOCK : GetUserDailyInfoResponse = {
                    groupsIncluded: [
                        {
                            Id: 12,
                            Name: 'Amigos do Clube'
                        },
                        {
                            Id: 22,
                            Name: 'Colegas de Trabalho'
                        }
                    ],
                    mySolicitations: [
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
                    myDelayedSolicitations: [
                        {
                            Id: 57,
                            Name: 'Levar carro na oficina'
                        }
                    ],
                    userParticipatingChats: 5,
                    userDreams: 17,
                    hestiaTasksThisWeek: 3,
                    hestiaTasksPending: 1,
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
                    userDailyInfo!.groupsIncluded.length > 0
                        ? (
                            <>
                                <h3>Meus Grupos</h3>
                                <div className="user-daily-info-group-enclosure">
                                    {
                                        userDailyInfo.groupsIncluded.map(group => (
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
                    userDailyInfo.mySolicitations.length > 0
                        ? (
                            <>
                                <h3>Minhas Solicitações</h3>
                                <div className="user-daily-info-group-enclosure">
                                    {
                                        userDailyInfo.mySolicitations.map(solicitation => (
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
                    userDailyInfo.myDelayedSolicitations.length > 0
                        ? (
                            <>
                                <h3>Minhas Solicitações Atrasadas</h3>
                                <div className="user-daily-info-group-enclosure">
                                    {
                                        userDailyInfo.myDelayedSolicitations.map(delayedSolicitation => (
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
                    userDailyInfo.userParticipatingChats > 0
                        ? <Link to={"/chats"}><p>Chats que estou incluido: <b>{ userDailyInfo.userParticipatingChats }</b></p></Link>
                        : <Link to={"/chats"}><p>Nenhum chat.</p></Link>
                }
                {
                    userDailyInfo.userDreams > 0
                        ? <Link to={"/morfeus"}><p>Meus sonhos: <b>{ userDailyInfo.userDreams }</b></p></Link>
                        : <Link to={"/morfeus"}><p>Nenhum sonho cadastrado.</p></Link>
                }
                {
                    userDailyInfo.hestiaTasksThisWeek > 0
                        ? <Link to={"/hestia"}><p>Tarefas desta semana: <b>{ userDailyInfo.hestiaTasksThisWeek }</b></p></Link>
                        : <Link to={"/hestia"}><p>Nenhuma tarefa para essa semana</p></Link>
                }
                {
                    userDailyInfo.hestiaTasksPending > 0
                        ? <Link to={"/hestia"}><p>Tarefas atrasadas: <b>{ userDailyInfo.hestiaTasksPending }</b></p></Link>
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