import {CtfStage} from "../modules/openapi/models/ctf-stage";

export const StageRoutingMap: Record<CtfStage, String> = {
    [CtfStage.Gooloog]: '/gooloog',
    [CtfStage.PasswordGame]: '/admin-password-recovery',
    [CtfStage.LoginWordle]: '/login',
    [CtfStage.LoginSignalChart]: '/login',
    [CtfStage.EndOfCtf]: ''
}
