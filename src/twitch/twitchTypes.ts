import { StreamerConfig } from "../models/streamerConfig";

export interface TwitchState {
    userId: string,
    clientId: string,
    token: string,
    channelId: string,
    streamerConfig: StreamerConfig
}